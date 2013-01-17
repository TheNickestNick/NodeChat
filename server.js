'use strict';

var port    = process.argv[2] || 1234
  , connect = require('connect')
  , sessionStore = new connect.session.MemoryStore
  , server = connect()
      .use(connect.cookieParser())
      .use(connect.session({ secret: 'I <3 penguins and sushi!', key: 'sid', store: sessionStore }))
      .use(connect.static(__dirname))
      .listen(port)
  , io      = require('socket.io').listen(server)
  , fs      = require('fs');

io.set('log level', 0);

io.sockets.on('authorization', function(data, accept) {
  data.username = '';
  accept(null, true);
});

console.log(connect.session.Store);

var usernames = [];

io.sockets.on('connection', function(socket) {
  socket.on('user-connect', function(data) {
    if (usernames.indexOf(data.username) === -1) {
      socket.handshake.username = data.username;
      usernames.push(data.username);
      socket.broadcast.emit('user-enter', {username: data.username});
      socket.emit('connect-success', {});
      console.log('user "%s" has joined the conversation', data.username);
      return;
    }

    socket.emit('connect-fail', { reason: 'Username ' + data.username + ' is already in-use. Please choose a different username.' });
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