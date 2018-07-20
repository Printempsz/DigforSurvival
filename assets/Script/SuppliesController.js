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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
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
                if(this._countATK > 0) this._countATK --;
                break;
            case cc.KEY.u: 
                if(this._countDEF > 0) this._countDEF --;
                break;
            case cc.KEY.i:
                if(this._countHG > 0) this._countMG --;
                break;
             case cc.KEY.o:
                if(this._countHM > 0) this._countHM --;
                break;
            case cc.KEY.p:
                if(this._countHPB > 0) this._countHPB --;
                break;
        }
    },

    onCollisionEnter: function (other,self) {
        console.log(other.node._tag);
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
                this._countHM++;
                other.node.destroy();
                this.UIController.PopInfo('HM');
                break;
            case "HPbag":
                this._countHPB++;
                other.node.destroy();
                this.UIController.PopInfo('HPBag');
                break;
        }
    }

    // update (dt) {},
});
