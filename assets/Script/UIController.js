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
       },
       Pop: {
           default: null,
           type: cc.Node
       }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Pop.children.forEach(e => {
            e.active = false;
        });
    },

    start () {
        this.player = cc.find('player');
        this.counter = this.player.getComponent('SuppliesController');
    },

    update (dt) {
        this.num_ATK.string = this.counter._countATK;
        this.num_DEF.string = this.counter._countDEF;
        this.num_MG.string = this.counter._countMG;
        this.num_HM.string = this.counter._countHM;
        this.num_HPB.string = this.counter._countHPB;
    },

    PopInfo: function (type) {
        var bg = this.Pop.getChildByName('BG');
        bg.active = true;
        var animation = bg.getComponent(cc.Animation);
        animation.play('PopBG');
        animation.on('finished', (bg) => {bg.active = false});
        switch(type) {
            case 'ATK':
            var atk = this.Pop.getChildByName('ATK');
            atk.active = true;
            atk.getComponent(cc.Animation).play('show');
            atk.getComponent(cc.Animation).on('finished', (atk) => {atk.active = false});
            break;
            case 'DEF':
            var def = this.Pop.getChildByName('DEF');
            def.active = true;
            def.getComponent(cc.Animation).play('show');
            def.getComponent(cc.Animation).on('finished', (def) => {def.active = false});
            break;
            case 'MG':
            var mg = this.Pop.getChildByName('MG');
            mg.active = true;
            mg.getComponent(cc.Animation).play('show');
            mg.getComponent(cc.Animation).on('finished', (mg) => {mg.active = false});
            break;
            case 'HPBag':
            var hp = this.Pop.getChildByName('HPBag');
            hp.active = true;
            hp.getComponent(cc.Animation).play('show');
            hp.getComponent(cc.Animation).on('finished', (hp) => {hp.active = false});
            break;
            case 'HM':
            var hm = this.Pop.getChildByName('HM');
            hm.active = true;
            hm.getComponent(cc.Animation).play('show');
            hm.getComponent(cc.Animation).on('finished', (hm) => {hm.active = false});
            break;
        }
    }
});
