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
    ctor: function() {
        this._direction = cc.Enum({
            X: 0,
            Y: 1
        })
    },
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
            default: false
        },
        speed: {
            default: 200
        },
        _direction: {
            default:null
        },
        direction: {
            default: null
        },
        MovingMusic: {
            default: null,
            url: cc.AudioClip
        }
    },

    onKeyDown: function (e) {
        console.log('press');
        switch(e.keyCode) {
            case cc.KEY.d:
                if (!this._run) {
                    this._run = true;
                    this._animation.play(this._animationClips[0].name);
                    this.current = cc.audioEngine.play(this.MovingMusic, true, 1);
                    this.speed = Math.abs(this.speed);
                    this.direction = this._direction.X
                }
            break;
            case cc.KEY.a:
                if (!this._run) {
                    this._run = true;
                    this._animation.play(this._animationClips[1].name);
                    this.current = cc.audioEngine.play(this.MovingMusic, true, 1);
                    this.speed = -Math.abs(this.speed);
                    this.direction = this._direction.X
                }
            break;
            case cc.KEY.w:
                if (!this._run) {
                    this._run = true;
                    this._animation.play(this._animationClips[2].name);
                    this.current = cc.audioEngine.play(this.MovingMusic, true, 1);
                    this.speed = Math.abs(this.speed);
                    this.direction = this._direction.Y
                }
            break;
            case cc.KEY.s:
                if (!this._run) {
                    this._run = true;
                    this._animation.play(this._animationClips[3].name);
                    this.current = cc.audioEngine.play(this.MovingMusic, true, 1);
                    this.speed = -Math.abs(this.speed);
                    this.direction = this._direction.Y
                }
            break;
        }
    },

    onKeyUp: function (e) {
        console.log('up');
        switch(e.keyCode) {
            case cc.KEY.d:
                this._animation.stop(this._animationClips[0].name);
                cc.audioEngine.stop(this.current);
                this._run = false;
            break;
            case cc.KEY.a:
                this._animation.stop(this._animationClips[1].name);
                cc.audioEngine.stop(this.current);
                this._run = false;
                break;
            case cc.KEY.w:
                this._animation.stop(this._animationClips[2].name);
                cc.audioEngine.stop(this.current);
                this._run = false;
                break;
            case cc.KEY.s:
                this._animation.stop(this._animationClips[3].name);
                cc.audioEngine.stop(this.current);
                this._run = false;
            break;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // update (dt) {},
    update (dt) {
        if (this._run) {
            if (this.direction == this._direction.X) {
                this.node.x += this.speed * dt
            } else if (this.direction == this._direction.Y) {
                this.node.y += this.speed * dt
            }
        }
    }
});
