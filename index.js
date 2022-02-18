const express = require('express')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

app.use(express.static('public'))

io.on('connection', (socket) => {
  socket.on('chat message payload', payload => {
    sendPayload = JSON.parse(payload)
    io.emit('chat message payload', payload);
  });
});

http.listen(port, () => {
  console.log(`Server Booted on port ${port}`);
});
