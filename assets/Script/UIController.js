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
       num_ATK: {
           default: null,
           type: cc.Label
       },
       num_DEF: {
           default: null,
           type: cc.Label
       },
       num_MG: {
           default:null,
           type: cc.Label
       },
       num_HM: {
           default:null,
           type: cc.Label
       },
       num_HPB: {
           default:null,
           type:cc.Label
       }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.player = cc.find('player');
        this.counter = this.player.getComponent('PickController');
    },

    update (dt) {
        this.num_ATK.string = this.counter._countATK;
        this.num_DEF.string = this.counter._countDEF;
        this.num_MG.string = this.counter._countMG;
        this.num_HM.string = this.counter._countHM;
        this.num_HPB.string = this.counter._countHPB;
    }
});
