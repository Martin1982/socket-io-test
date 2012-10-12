var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8089);

function handler (req, res) {
  fs.readFile(__dirname + '/client.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
	console.log(socket);
  // emit a handshake event
  socket.emit('handshake', { connected: true });
  
  socket.on('enterworld', function(playerId){
  	io.sockets.emit('createplayer', { 'playerId' : playerId });
  });
  
  socket.on('gridclick', function (data) {
    io.sockets.emit('setblock', data);
  });
});
