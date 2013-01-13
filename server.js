'use strict';

var server = require('http').createServer(handler)
  , io     = require('socket.io').listen(server)
  , fs     = require('fs');

io.set('log level', 0);
  
var port = process.argv[2] || 1234;
server.listen(port);

function handler(req, res) {
  if (req.url === '/jquery-1.8.3.min.js') {
    sendFile(res, '/jquery-1.8.3.min.js');
  }
  else {
    sendFile(res, '/client.html');
  }
}

function sendFile(res, path) {
  fs.readFile(__dirname + path,
    function(err, data) {
      if (err) {
        res.writeHead(500);
        res.end('Could not load chat client.');
      }
      else {
        res.writeHead(200);
        res.end(data);
      }
    });
}

function publishChatMessage(msg) {
   io.sockets.emit('chat-message', msg);
}

io.sockets.on('connection', function(socket) {
  socket.on('user-enter', function(data) {
    console.log('user "%s" has joined the conversation', data.username);
    socket.broadcast.emit('user-enter', {username: data.username});
  });
  
  socket.on('chat-message', function (data) {
    publishChatMessage({ username: data.username, text: data.text });
  });
});