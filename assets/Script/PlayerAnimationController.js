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
    onLoad: function() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this._animation = this.getComponent(cc.Animation);
        this._animationClips = this._animation.getClips();
        this._animationClips.forEach(e => {
            e.wrapMode = cc.WrapMode.Loop;
        });
    },
    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    properties: {
        _animation: {
            default: null,
            type: cc.Animation
        },
        _animationClips: {
            default: null,
            type: cc.AnimationClip
        },
        _run: {
            default: false,
            type: Boolean
        }
    },

    onKeyDown: function (e) {
        switch(e.keyCode) {
            case cc.KEY.d:
                console.log("press d");
                if (!this._run) {
                    this._animation.play(this._animationClips[0].name);
                    this._run = true;
                }
            break;
        }
    },

    onKeyUp: function (event) {
        switch(event.keyCode) {
            case cc.KEY.d:
                console.log('release d');
                this._animation.stop(this._animationClips[0].name);
                this._run = false;
            break;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    update (dt) {
        if (this._run) {
            this.node.x += 100*dt
        }
    }
});
