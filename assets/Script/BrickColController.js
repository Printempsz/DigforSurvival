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
        _counter: {
            default: 0,
            type:cc.Integer
        },
        _fpsCount: {
            default:0,
            type:cc.Integer
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
    },

    onCollisionEnter: function (other,self) {
        if(other.node._name == 'flame') {
            this._counter++;
            if(this._counter > 3) self.node.destroy();
        }
    },

    onCollisionStay: function (other,self) {//碰撞保持
        if(other.node._name == 'flame') {
            this._fpsCount++;
            if(this._fpsCount > 59) this._counter++;
            if(this._counter > 3) self.node.destroy();
        }
    },

    update (dt) {
        if(this._counter > 3) this.node.destroy();
    },
});
