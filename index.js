const express = require('express')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;
const json = require('./config.json')

app.use(express.static('public'))

app.use(express.json());

io.on('connection', (socket) => {
  socket.on('chat message payload', payload => {
    io.emit('chat message payload', payload);
  });

  socket.on('logoutAll', payload => {
    var sentPayload = JSON.parse(payload)
    if(sentPayload.backendToken != json.backendToken){
      return
    }else{
     io.emit('logoutAll', payload); 
    }
  });

  socket.on('sendAllGoogle', payload => {
    var sentPayload = JSON.parse(payload)
    if(sentPayload.backendToken != json.backendToken){
      return
    }else{
     io.emit('sendAllGoogle', payload); 
    }
  });

  socket.on('clearAllActive', payload => {
    var sentPayload = JSON.parse(payload)
    if(sentPayload.backendToken != json.backendToken){
      return
    }else{
     io.emit('clearAllActive', payload); 
    }
  });

  socket.on('loginVerification', payload => {
    var sentPayload = JSON.parse(payload)
    if(sentPayload.password != json.password){
      io.emit('loginVerificationReturn', `{"sessionId": "${sentPayload.sessionId}", "result": false, "backendToken":""}`);
    }else if(sentPayload.password == json.password){
      io.emit('loginVerificationReturn', `{"sessionId": "${sentPayload.sessionId}", "result": true, "backendToken":"${json.backendToken}"}`);
    }
  });

});

http.listen(port, () => {
  console.log(`Server Booted on port ${port}`);
});
