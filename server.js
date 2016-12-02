var fs = require('fs')
var app = require('express')();
var https = require('https');
var options = {
  key: fs.readFileSync('./config/local.key'),
  cert: fs.readFileSync('./config/local.crt')
};
var server = https.createServer(options, app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
     });
});

server.listen(443, function(){
    console.log('listening on 443');
});
