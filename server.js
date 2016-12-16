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

    // var clients = io.of('/chat').clients();
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('imageBuffer', function(imageBuffer){
        io.emit('image', imageBuffer);
    });
    socket.on('get image', function(){
        io.emit('get image');
    });
});

server.listen(443, function(){
    console.log('listening on 443');
});
