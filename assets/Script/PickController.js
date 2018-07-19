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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    onCollisionEnter: function (other,self) {
        console.log(other.node._tag);
        switch(other.node._tag) {
            case "ATK":
                this._countATK++;
                other.node.destroy();
                break;
            case "DEF":
                this._countDEF++;
                other.node.destroy();
                break;
            case "MG":
                this._countMG++;
                other.node.destroy();
                break;
        }
        console.log(this._countATK,this._countDEF,this._countMG)
    }

    // update (dt) {},
});
