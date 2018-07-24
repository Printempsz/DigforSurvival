// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
cc.Class({
    extends: cc.Component,
    properties: {
        map: {
            default: null,
            type: cc.Node
        },
        camera: {
            default: null,
            type: cc.Node
        },
        player: null,
        UIController: {
            default: null,
            type: cc.Node
        },
        QTE: {
            default: null,
            type: cc.Node
        },
        Net:{
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //manager.enabledDebugDraw = true;//碰撞辅助线
        
        this.map.getComponent('MapCreator').enabled = false;
        this.camera.getComponent('CameraController').enabled = false;
        this.UIController.getComponent('UIController').enabled = false;
        this.QTE.getComponent('QTEController').enabled = false;
        this.Net.getComponent('NetController').enabled = false;
        var self = this;
        var players = [];
        cc.loader.loadResDir("Prefabs/players", function (err, prefabs) {
            var index = Math.floor(Math.random() * prefabs.length);
            self.player = prefabs[index];
            console.log('load player');
            self.map.getComponent('MapCreator').enabled = true;
            cc.loader.loadResDir("Prefabs/OtherPlayers", function (err, prefabs) {
                console.log('load others')
                console.log(prefabs)
                var NetController = self.Net.getComponent('NetController');
                NetController.enabled = true;
                NetController.otherPlayers = prefabs;
                NetController.MapController = self.map.getComponent('MapCreator');
                NetController.UIController = self.UIController.getComponent('UIController');
                NetController.QTE = self.QTE.getComponent('QTEController');
                NetController.CameraController = self.camera.getComponent('CameraController');
                console.log(NetController)
            });
        });
    },

    start () {

    },

    // update (dt) {},
});
