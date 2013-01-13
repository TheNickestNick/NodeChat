var server = require('http').createServer(handler)
  , io     = require('socket.io').listen(server)
  , fs     = require('fs');

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

function publishComment(comment) {
   io.sockets.emit('comment', comment);
}

io.sockets.on('connect', function(sock) {
  sock.on('comment', function (data) {
    publishComment({ username: data.username, text: data.text });
  });
});