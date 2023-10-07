const express = require('express');
const app = express();
const PORT = 4000;
const IP = 'localhost';

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());
const socketIO = require('socket.io')(http, {
  cors: {
    origin: `http://${IP}:5173`,
  },
});

// let users = [];
let sessions = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  // Ouve mensagens e retorna aos clientes
  socket.on('message', (data) => {
    console.log(data);
    socketIO.emit('messageResponse', { ...data, timestamp: new Date() });
  });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  // Lista novos usuarios que se conectaram ao server
  socket.on('newUser', ({ userName, socketID, sessionID, newSesh }) => {
    // users.push(data);

    if (newSesh) {
      sessions.push({
        id: sessionID,
        users: [{ userName, socketID }],
      });
    } else {
      sessions
        .find((s) => s.id === sessionID)
        .users.push({
          userName,
          socketID,
        });
    }

    console.log(sessions);

    socketIO.emit(
      'newUserResponse',
      sessions.find((s) => s.id === sessionID).users
    );
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');

    const seshIndex = sessions.findIndex((s) =>
      s.users.some((user) => user.socketID !== socket.id)
    );

    if (seshIndex !== -1) {
      // Filtra os usuários da sessão para remover o usuário com o ID especificado
      sessions[seshIndex].users = sessions[seshIndex].users.filter(
        (user) => user.socketID !== socket.id
      );

      sessions[seshIndex].users.length === 0
        ? sessions.splice(seshIndex, 1)
        : null;
    }

    console.log(sessions);
    // users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    socketIO.emit('newUserResponse', sessions[seshIndex]?.users ?? []);
    socket.disconnect();
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
