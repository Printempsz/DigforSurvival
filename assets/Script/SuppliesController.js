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
        _timer: {
            default: 0,
            type: cc.Integer
        },
        _HP: {
            default: 100,
            type: cc.Integer
        },
        _ATK: {
            default: 0,
            type: cc.Integer
        },
        _DEF: {
            default: 0,
            type: cc.Integer
        },
        _countATK: {
            default: 0,
            type: cc.Integer
        },
        _countDEF: {
            default:0,
            type: cc.Integer
        },
        _countMG: {
            default:0,
            type: cc.Integer
        },
        _countHM: {
            default: 0,
            type: cc.Integer
        },
        _countHPB: {
            default:0,
            type: cc.Integer
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    start () {
        this.UIController = cc.find('Canvas/UI').getComponent('UIController');
    },

    onKeyDown: function (e) {
        switch(e.keyCode) {
            case cc.KEY.y:
                if(this._countATK > 0) {
                    this._countATK --;
                    this._ATK += 5;
                }
                break;
            case cc.KEY.u: 
                if(this._countDEF > 0) {
                    this._countDEF --;
                    this._DEF += 5;
                }
                break;
            case cc.KEY.i:
                if(this._countMG > 0) {
                    this._countMG --;
                    this._ATK += 5;
                    this._DEF += 5;
                    this._countHM += 5;
                    this._HP += 5;
                }
                break;
            case cc.KEY.o:
                if(this._countHPB > 0) {
                    this._countHPB --;
                    this._HP += 5;
                }
                break;
        }
    },

    onCollisionEnter: function (other,self) {
        //console.log(other.node._tag);
        switch(other.node._tag) {
            case "ATK":
                this._countATK++;
                other.node.destroy();
                this.UIController.PopInfo('ATK');
                break;
            case "DEF":
                this._countDEF++;
                other.node.destroy();
                this.UIController.PopInfo('DEF');
                break;
            case "MG":
                this._countMG++;
                other.node.destroy();
                this.UIController.PopInfo('MG');
                break;
            case "hammer":
                this._countHM += 5;
                other.node.destroy();
                this.UIController.PopInfo('HM');
                break;
            case "HPbag":
                this._countHPB++;
                other.node.destroy();
                this.UIController.PopInfo('HPBag');
                break;
        }
    },

    update (dt) {
        this._timer++;
        //console.log(this._HP,this._ATK,this._DEF,this._countHM);
        if(this._timer > 59) {
            if(this._ATK > 0)this._ATK--;
            this._timer = 0;
        }
    },
});
