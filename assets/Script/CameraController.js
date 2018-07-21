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
    onLoad: function () {
        this.camera = this.getComponent(cc.Camera);
    },
    properties: {
        camera: null,
        player: null,
        _Game: null
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.player = cc.director.getScene().getChildByName('player');
        console.log(cc.director.getScene())
        this.camera.addTarget(this.player);
        this.camera.addTarget(cc.director.getScene().getChildByName('Servants'));
    },

    update (dt) {
        this.node.setPosition(this.player.getPosition())
    },
});
