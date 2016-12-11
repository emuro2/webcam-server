var fs = require('fs')
var app = require('express')();
var https = require('https');
var options = {
    key: fs.readFileSync('./config/local.key'),
    cert: fs.readFileSync('./config/local.crt')
};
var server = https.createServer(options, app);
var io = require('socket.io')(server);
var ss = require('socket.io-stream');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

    // var clients = io.of('/chat').clients();
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('imageBuffer', function(imageBuffer){
        console.log("getting stream from video");

        io.emit('image', imageBuffer);
        // io.emit('test', "hello");
        // console.log(imageBuffer);
        // require("fs").createWriteStream("./result.jpg").end(imageBuffer);
    });
    //   ss(socket).on('imageBuffer', function(stream) {
    //       console.log("getting ss from video");
    //     io.emit('image', stream);
    //   });
    socket.on('get image', function(){
        io.emit('get image');
        // console.log("requesting image");
    });
});

server.listen(443, function(){
    console.log('listening on 443');
});
