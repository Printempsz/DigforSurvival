var app = require('express')();
var uuid = require('uuid/v1');
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(7777, function(){
  console.log('listening on *:7777');
});

var PlayerData = [];

io.on('connection',function(socket) {
    var key = uuid();
    console.log('one player join');
    socket.emit('join_successful',key); //向建立该连接的用户发送
    socket.on('init',function(data) {
      PlayerData[key] = {};
      PlayerData[key].x = data.x;
      PlayerData[key].y = data.y;
      PlayerData[key].curKey = data.curKey;
      // console.log(PlayerData)
      var already = [];
      for (var mykey in PlayerData) {
        if (mykey != key) {
          already.push({
            key: mykey,
            info: PlayerData[mykey]
          });
        }
      }
      socket.emit('GetAlreadyPlayers',already);
      socket.broadcast.emit('otherJoin', {
        key: key,
        info: PlayerData[key]
      });
    });
    //向其他用户发送
    // io.sockets.emit('')//向所有用户发送


    socket.on('position',function(data) {
      PlayerData[data.key].x = data.x;
      PlayerData[data.key].y = data.y;
      PlayerData[data.key].curKey = data.curKey;
      // console.log(PlayerData);
      socket.broadcast.emit('otherPosition',PlayerData);
      // console.log(PlayerData);
    })
});



