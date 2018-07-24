cc.Class({
    extends: cc.Component,

    properties: {
        otherPlayers: null,
        isUpadte: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
        this.CamreaController = cc.find('Camera').getComponent('CameraController');
        this.socket = window.io("http://localhost:7777");
        var self = this;
        this.socket.on('join_successful',function(data) {
            self.key = data;
            self.isUpadte = true;
            self.localPlayer = cc.find('player');
            self.socket.emit('init',{
                x:self.localPlayer.x,
                y:self.localPlayer.y,
                curKey:self.curKey._curKey
            });
        })
        this.socket.on('otherJoin',function(data) {
            var otherPlayers = cc.instantiate(self.otherPlayers[0]);
            self.CamreaController.camera.addTarget(otherPlayers);
            otherPlayers.getComponent('OtherPlayerController').key = data.key;
            var scene = cc.director.getScene();
            otherPlayers.setPosition(data.info.x, data.info.y);
            scene.addChild(otherPlayers, 1, 'otherPlayer_' + data.key);
        });
        this.localPlayer = cc.find('player');
        this.curKey = this.localPlayer.getComponent('PlayerAnimationController');
        
        this.socket.on('GetAlreadyPlayers',function(data) {
            console.log(data);
            for(var index in data) { 
                    var otherPlayers = cc.instantiate(self.otherPlayers[0]);
                    self.CamreaController.camera.addTarget(otherPlayers);
                    otherPlayers.getComponent('OtherPlayerController').key = data[index].key;
                    var scene = cc.director.getScene();
                    console.log(data[index]);
                    otherPlayers.setPosition(data[index].info.x, data[index].info.y);
                    scene.addChild(otherPlayers, 1, 'otherPlayer_' + data[index].key);
            }
        });
        
        this.socket.on('otherPosition',function(data) {
            for(var index in data) {
                if(data[index].key !== self.key) {
                    // console.log(index);
                    var scene = cc.director.getScene();
                    var otherPlayer = scene.getChildByName('otherPlayer_' + data[index].key);
                    // console.log(scene,'otherPlayer_' + data[index].key);
                    // console.log(otherPlayer);
                    otherPlayer.setPosition(data[index].info.x,data[index].info.y);
                    var Animation = otherPlayer.getComponent(cc.Animation);
                    var AnimationClips = Animation.getClips();
                    switch(data[index].info.curKey) {
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
            }
        })
    },

    update (dt) {
        if (this.isUpadte) {
            this.socket.emit('position',{
                key:this.key,
                x:this.localPlayer.x,
                y:this.localPlayer.y,
                curKey:this.curKey._curKey
            });
        }
    }
});
