'use strict';

var port    = process.argv[2] || 1234
  , express = require('express')
  , connect = require('connect')
  , app     = express()
  , server  = app.listen(port)
  , io      = require('socket.io').listen(server)
  , fs      = require('fs');

io.set('log level', 0);

app
  .use(express.cookieParser())
  .use(express.cookieSession({secret:'some kind of secret sauce'}))
  .use('/', express.static(__dirname));

io.sockets.on('authorization', function(data, accept) {
  data.username = '';
  accept(null, true);
});

var usernames = [];

io.sockets.on('connection', function(socket) {
  socket.on('user-enter', function(data) {
    console.log('user "%s" has joined the conversation', data.username);
    
    if (usernames.indexOf(data.username) === 0) {
      socket.handshake.username = data.username;
      usernames.push(data.username);
      socket.broadcast.emit('user-enter', {username: data.username});
      socket.emit('connect-success', {});
      return;
    }
    
    socket.emit('username-in-use', {});
  });
  
  socket.on('chat-message', function (data) {
    io.sockets.emit('chat-message', { username: socket.handshake.username, text: data.text });
  });
});

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data) {
  if (data.indexOf('system') === 0) {
    io.sockets.emit('system-message', { text: data.substring(6, data.length) });
  }
});