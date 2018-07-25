cc.Class({
    extends: cc.Component,

    properties: {
        isUpadte: false,
        MapController: null,
        UIController: null,
        QTE: null,
        CameraController: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    postDeleteServant(data) {
        console.log(data);
        if(this.localPlayer != null) {
            //data is servant name&id (string)
            this.socket.emit('deleteServant',data);
        }
    },

    postDeleteBrick(data) {
        console.log(data);
        if(this.localPlayer != null) {
            //data is servant name&id (string)
            this.socket.emit('deleteBrick',data);
        }
    },

    start () {
        this.CamreaController = cc.find('Camera').getComponent('CameraController');
        this.socket = window.io("http://localhost:7777");
        var self = this;
        this.socket.on('join_successful',function(data) {
            self.key = data.key;
            self.MapController.MapWidth = data.mapWidth;
            self.MapController.MapHeight = data.mapHeight;
            self.brickSize = data.brickSize;
            self.MapController.MapCreator(data.map, data.supplisePosition);
            self.MapController.PlayerCreator(data.playerPosition, data.playerName);
            self.UIController.enabled = true;
            self.QTE.enabled = true;
            self.CameraController.enabled = true;
            self.localPlayer = cc.find('player');
            self.curKey = self.localPlayer.getComponent('PlayerAnimationController');
            self.isUpadte = true;
            self.SuppliesController = self.localPlayer.getComponent('SuppliesController');
        })



        this.socket.on('otherJoin',function(data) {
            var otherPlayers = cc.instantiate(self.otherPlayers[0]);
            self.CamreaController.camera.addTarget(otherPlayers);
            otherPlayers.getComponent('OtherPlayerController').key = data.key;
            otherPlayers.getChildByName('name').getComponent(cc.Label).string = data.name;
            var scene = cc.director.getScene();
            otherPlayers.setPosition(data.info.x, data.info.y);
            scene.addChild(otherPlayers, 1, 'otherPlayer_' + data.key);
        });
        
        
        this.socket.on('GetAlreadyPlayers',function(data) {
            for(var index in data) { 
                    var otherPlayers = cc.instantiate(self.otherPlayers[0]);
                    self.CamreaController.camera.addTarget(otherPlayers);
                    otherPlayers.getComponent('OtherPlayerController').key = data[index].key;
                    otherPlayers.getChildByName('name').getComponent(cc.Label).string = data[index].name;
                    var scene = cc.director.getScene();
                    otherPlayers.setPosition(data[index].info.x, data[index].info.y);
                    scene.addChild(otherPlayers, 1, 'otherPlayer_' + data[index].key);
            }
        });
        
        this.socket.on('otherPosition',function(data) {
            if (data.key !== self.key) {
                var scene = cc.director.getScene();
                var otherPlayer = scene.getChildByName('otherPlayer_' + data.key);
                otherPlayer.setPosition(data.info.x,data.info.y);
                var Animation = otherPlayer.getComponent(cc.Animation);
                var AnimationClips = Animation.getClips();
                switch(data.info.curKey) {
                    case 1:
                        Animation.play(AnimationClips[0].name);
                        break;
                    case 2:
                        Animation.play(AnimationClips[1].name);
                        break;
                    case 3:
                        Animation.play(AnimationClips[2].name);
                        break;
                    case 4:
                        Animation.play(AnimationClips[3].name);
                        break;
                }
            }
        })

        setInterval(function() {
            if(self.SuppliesController != null) {
                if(self.SuppliesController._ATK > 0) {
                    self.SuppliesController._ATK--;
                    self.socket.emit('attack');
                }
            }
        },1000);

        this.socket.on('otherATK',function(data) {
            if(self.SuppliesController._DEF > 0) self.SuppliesController._DEF--;
            else self.SuppliesController._HP--;
            if(self.SuppliesController._HP <1) {
                self.socket.disconnect();
                alert('您已死亡,自动离线');
            }
        })

        this.socket.on('deleteServant',function(data) {
            // console.log('recieved');
            if(self.SuppliesController != null) {
                self.SuppliesController.deleteServant(data);
            }
        })

        this.socket.on('deleteBrick',function(data) {
            if(self.MapController != null) {
                self.MapController.deleteBrick(data);
            }
        })
    },

    update (dt) {
        if (this.isUpadte) {
            var self = this;
            this.socket.emit('position',{
                key:self.key,
                x:self.localPlayer.x,
                y:self.localPlayer.y,
                curKey:self.curKey._curKey
            });
        }
    }
});
