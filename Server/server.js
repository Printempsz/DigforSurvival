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
var already = [];

/*
  PlayerDate = [
    {
      "key": "xxxx",
      "info": {
                x:x,
                y:y,
                curKey:curKey
              }
    },
    {
      ...
    }
    ...
  ]   


*/


io.on('connection',function(socket) {
    var key = uuid();
    console.log('one player join');
    socket.emit('join_successful',key); //向建立该连接的用户发送
    socket.on('init',function(data) {
      var info = {
        x : data.x,
        y : data.y,
        curKey : data.curKey
      };
      var index;
      for(index in PlayerData) {
          already.push(PlayerData[index]);
      }
      var pos = PlayerData.length;
      PlayerData.push({
        key:key,
        info:info
      });
      socket.emit('GetAlreadyPlayers',already);

      socket.broadcast.emit('otherJoin', {
        key: key,
        info: PlayerData[pos].info
      });
    });
    //向其他用户发送
    // io.sockets.emit('')//向所有用户发送


    socket.on('position',function(data) {
      for(var index in PlayerData) {
        if(PlayerData[index].key == data.key) {
          PlayerData[index].info.x = data.x;
          PlayerData[index].info.y = data.y;
          PlayerData[index].info.curKey = data.curKey;
          socket.emit('otherPosition', PlayerData);
        }
      }
    })
});



