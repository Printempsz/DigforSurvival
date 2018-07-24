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
        cc.director.getPhysicsManager().enabled = true;

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
            default: 50
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
        },
        _colLock: {
            default:false,
            type: cc.Boolean
        },
        _lastKey: {
            default: null,
            type:cc.Integer
        },
        _curKey: {
            default: null,
            type: cc.Integer
        },
        _lockKey: {
            default: null
        }
    },

    onKeyDown: function (e) {
        switch(e.keyCode) {
            case cc.KEY.d:
                if (!this._run) {
                    // console.log(this.speed);
                    this._run = true;
                    this._animation.play(this._animationClips[0].name);
                    this.current = cc.audioEngine.play(this.MovingMusic, true, 1);
                    this._curKey = 1;
                    if(this._lockKey != this._curKey || this._colLock == false) {
                        this.speed = 50;
                    }
                    else this.speed = 0;
                    this.speed = Math.abs(this.speed);
                    this.direction = this._direction.X;
                }
                break;
            case cc.KEY.a:
                if (!this._run) {
                    this._run = true;
                    this._animation.play(this._animationClips[1].name);
                    this.current = cc.audioEngine.play(this.MovingMusic, true, 1);
                    this._curKey = 2;
                    if(this._lockKey != this._curKey || this._colLock == false) {
                        this.speed = 50;
                    }
                    else this.speed = 0;
                    this.speed = -Math.abs(this.speed);
                    this.direction = this._direction.X;
                }
                break;
            case cc.KEY.w:
                if (!this._run) {
                    this._run = true;
                    this._animation.play(this._animationClips[2].name);
                    this.current = cc.audioEngine.play(this.MovingMusic, true, 1);
                    this._curKey = 3;
                    if(this._lockKey != this._curKey || this._colLock == false) {
                        this.speed = 50;
                    }
                    else this.speed = 0;
                    this.speed = Math.abs(this.speed);
                    this.direction = this._direction.Y;
                }
                break;
            case cc.KEY.s:
                if (!this._run) {
                    this._run = true;
                    this._animation.play(this._animationClips[3].name);
                    this.current = cc.audioEngine.play(this.MovingMusic, true, 1);
                    this._curKey = 4;
                    if(this._lockKey != this._curKey || this._colLock == false) {
                        this.speed = 50;
                    }
                    else this.speed = 0;
                    this.speed = -Math.abs(this.speed);
                    this.direction = this._direction.Y;
                }
                break;
        }
    },

    onKeyUp: function (e) {
        switch(e.keyCode) {
            case cc.KEY.d:
                this._animation.stop(this._animationClips[0].name);
                cc.audioEngine.stop(this.current);
                this._run = false;
                this._lastKey = 1;
                break;
            case cc.KEY.a:
                this._animation.stop(this._animationClips[1].name);
                cc.audioEngine.stop(this.current);
                this._run = false;
                this._lastKey = 2;
                break;
            case cc.KEY.w:
                this._animation.stop(this._animationClips[2].name);
                cc.audioEngine.stop(this.current);
                this._run = false;
                this._lastKey = 3;
                break;
            case cc.KEY.s:
                this._animation.stop(this._animationClips[3].name);
                cc.audioEngine.stop(this.current);
                this._run = false;
                this._lastKey = 4;
                break;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // this.NetController = cc.find('NetController');
    },

    onCollisionEnter: function (other,self) {//产生碰撞
            // console.log("start");
            this._colLock = true;
            this._lockKey = this._curKey;
            if (this.direction == this._direction.X) {
                this.node.x -= this.speed * 0.1
            } else if (this.direction == this._direction.Y) {
                this.node.y -= this.speed * 0.1
            }
            this.speed = 0;
    },

    onCollisionStay: function (other,self) {//碰撞保持
        // console.log("ING");
        this._colLock = true;
    },

    onCollisionExit: function (other,self) {//碰撞结束
        // console.log("end");
        this._colLock = false;
    },

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