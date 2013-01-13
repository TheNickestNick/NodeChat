var app    = require('http')
  , server = require('http').createServer(handler)
  , io     = require('socket.io').listen(app)
  , fs     = require('fs');

app.listen(80);

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