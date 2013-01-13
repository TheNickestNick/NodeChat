var server = require('http').createServer(handler)
  , io     = require('socket.io').listen(server)
  , fs     = require('fs');

var port = process.argv[2] || 1234;
server.listen(port);

function handler(req, res) {
  fs.readFile(__dirname + '/client.html',
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