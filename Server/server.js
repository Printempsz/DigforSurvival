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
var MapWidth = 1000;
var MapHeight = 3000;
var brickSize = 50;
var xNumbers = MapWidth/brickSize;
var yNumbers = MapHeight/brickSize;
var brickChance = 0.5;
var MinPlayerBirthLevel = 2;
var SupplisePosition = [];
var PossibleBirthPosition = [];
var map = [];
for (var i = 0; i < yNumbers - 2; i++) {
    var line = []
    for (var j = 0; j < xNumbers - 2; j++) {
        line[j] = Math.random() > brickChance ? 1 : 0;
        if (line[j] === 0) {
          var flag = Math.random();
          if (flag <= 0.05) {
            line[j] = 2;
            SupplisePosition.push(
              {
                type: 'ATK',
                name: 'ATK_'+i+'_'+j,
                x: (j + 1) * brickSize + (brickSize / 2),
                y: (i + 1) * brickSize + (brickSize / 2)
              }
            )
          }
          else if (flag <= 0.1) {
            line[j] = 2;
            SupplisePosition.push(
              {
                type: 'DEF',
                name: 'DEF_'+i+'_'+j,
                x: (j + 1) * brickSize + (brickSize / 2),
                y: (i + 1) * brickSize + (brickSize / 2)
              }
            )
          }
          else if (flag <= 0.12) {
            line[j] = 2;
            SupplisePosition.push(
              {
                type: 'MG',
                name: 'MG_'+i+'_'+j,
                x: (j + 1) * brickSize + (brickSize / 2),
                y: (i + 1) * brickSize + (brickSize / 2)
              }
            )
          } else if (flag <= 0.17) {
            line[j] = 2;
            SupplisePosition.push(
              {
                type: 'HPbag',
                name: 'HPbag_'+i+'_'+j,
                x: (j + 1) * brickSize + (brickSize / 2),
                y: (i + 1) * brickSize + (brickSize / 2)
              }
            )
          } else if (flag <= 0.22) {
            line[j] = 2;
            SupplisePosition.push(
              {
                type: 'HM',
                name: 'HM_'+i+'_'+j,
                x: (j + 1) * brickSize + (brickSize / 2),
                y: (i + 1) * brickSize + (brickSize / 2)
              }
            )
          } else {
            if (i >= yNumbers - 3 - MinPlayerBirthLevel) {
              PossibleBirthPosition.push({
                x: (j + 1) * brickSize + (brickSize / 2),
                y: (i + 1) * brickSize + (brickSize / 2),
                i: i,
                j: j
              });
            }
          }
        }
    }
    map.push(line);
}

var clientsCount = 0;

io.on('connection',function(socket) {
    var _key = uuid();
    console.log('one player join');
    clientsCount++;
    var ran = Math.floor(Math.random() * PossibleBirthPosition.length);
    var PlayerBirth = {
      x: PossibleBirthPosition[ran].x,
      y: PossibleBirthPosition[ran].y
    }
    PossibleBirthPosition.splice(ran, 1);
    var playerName = 'player' + clientsCount;
    socket.emit('join_successful',{
      map: map,
      playerPosition: PlayerBirth,
      supplisePosition: SupplisePosition,
      key: _key,
      playerName: playerName,
      mapHeight: MapHeight,
      mapWidth: MapWidth,
      brickSize: brickSize
    }); //向建立该连接的用户发送
    var already = [];
    for (var this_key in PlayerData) {
      already.push(PlayerData[this_key])
    }
    socket.emit('GetAlreadyPlayers',already);

    PlayerData[_key] = {
      key: _key,
      name: playerName,
      info: {
        x: PlayerBirth.x,
        y: PlayerBirth.y,
        curKey: null
      }
    }

      socket.broadcast.emit('otherJoin', PlayerData[_key]);
    //向其他用户发送
    // io.sockets.emit('')//向所有用户发送


    socket.on('position',function(data) {
      // console.log(data.key)
      var info = {
        x: data.x,
        y: data.y,
        curKey: data.curKey
      }
      var obj = {
        key: data.key,
        name: playerName,
        info: info
      }
      PlayerData[data.key] = obj
      socket.broadcast.emit('otherPosition', obj);
    })

    socket.on('attack',function(data) {
      socket.broadcast.emit('otherATK');
    })

    socket.on('deleteServant',function(data) {
      for(var index in SupplisePosition) {
        if(SupplisePosition[index].name === data) {
          SupplisePosition.splice(index, 1);
          socket.broadcast.emit('deleteServant',data);
          break;
        }
      }
    })

    socket.on('deleteBrick',function(data) {
      console.log(data);
      socket.broadcast.emit('deleteBrick',data);
      var split = data.split('_');
      map[+split[1]][+split[2]] = -1;
    })

    socket.on('disconnect', function () {
      console.log('a player left');
      clientsCount--;
      delete PlayerData[_key]
    })
});



