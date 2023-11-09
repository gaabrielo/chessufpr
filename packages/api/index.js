const express = require('express');
const app = express();
const PORT = 4000;
const IP = '10.158.60.85';

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());
const socketIO = require('socket.io')(http, {
  cors: {
    origin: `http://${IP}:5173`,
  },
});

let users = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('pieceMoved', (data) => {
    socketIO.emit('pieceMovedResponse', data);
  });

  socket.on('gameStarted', (data) => {
    socketIO.emit('gameStartedResponse', data);
  });

  // Ouve mensagens e retorna aos clientes
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', { ...data, timestamp: new Date() });
  });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  // Lista novos usuarios que se conectaram ao server
  socket.on('newUser', (data) => {
    if (users.length === 0) {
      users.push({
        ...data,
        player: 1,
      });
    } else if (users.length === 1) {
      users.push({
        ...data,
        player: 2,
      });
    } else {
      users.push(data);
    }

    socketIO.emit('newUserResponse', users);
    console.log('🚀 ~ file: index.js:35 ~ socket.on ~ users:', users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter((user) => user.socketID !== socket.id);

    if (
      typeof users[0]?.player !== 'number' ||
      typeof users[1]?.player !== 'number'
    ) {
      // Envie a primeira resposta
      if (users.length > 1 && typeof users[0]?.player !== 'number') {
        users[0].player = 1;
        if (typeof users[1]?.player !== 'number') users[1].player = 2;
      } else {
        if (users.length > 1 && typeof users[1]?.player !== 'number')
          users[1].player = users[0].player === 1 ? 2 : 1;
      }
      socketIO.emit('newUserResponse', users, () => {
        // Após a primeira resposta ser enviada, envie a segunda resposta
        socketIO.emit('gameStartedResponse', false, () => {
          // Após a segunda resposta ser enviada, desconecte o socket
          socket.disconnect();
        });
      });
    } else {
      // Caso contrário, apenas desconecte o socket
      socket.disconnect();
    }

    // if (
    //   typeof users[0]?.player !== 'number' ||
    //   typeof users[1]?.player !== 'number'
    // ) {
    //   socketIO.emit('newUserResponse', users);
    //   socketIO.emit('gameStartedResponse', false);
    // }

    // socketIO.emit('newUserResponse', users);
    // console.log('🚀 ~ file: index.js:70 ~ socket.on ~ users:', users);
    // socket.disconnect();
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, IP, () => {
  console.log(`Server listening on ${PORT}`);
});
