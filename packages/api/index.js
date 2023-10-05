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

let users = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  // Ouve mensagens e retorna aos clientes
  socket.on('message', (data) => {
    console.log(data);
    socketIO.emit('messageResponse', { ...data, timestamp: new Date() });
  });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  // Lista novos usuarios que se conectaram ao server
  socket.on('newUser', (data) => {
    users.push(data);
    console.log(users);
    socketIO.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter((user) => user.socketID !== socket.id);
    console.log(users);
    socketIO.emit('newUserResponse', users);
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
