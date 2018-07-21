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
        _blue: null,
        _red: null,
        _pressBlue: null,
        _pressRed: null,
        _moveBlue: null,
        _moveRed: null,
        QTEItem: {
            default: null,
            type: cc.Prefab
        },
        _target: null,
        _targetType: ''
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._blue = new cc.Color(3,169,244,200);
        this._red = new cc.Color(239,83,80,200);
        this._pressBlue = new cc.Color(2,136,209,200);
        this._pressRed = new cc.Color(211,47,47,200);
        this._moveBlue = new cc.Color(79,195,247,200);
        this._moveRed = new cc.Color(229,115,115,200);
    },

    start () {
        this.SuppliseController = cc.find('player').getComponent('SuppliesController');
        this.UIController = this.node.parent.getComponent("UIController");
    },

    // update (dt) {},

    DrawQTEitem: function (node, color) {
        node.addComponent(cc.Graphics);
        var ctx = node.getComponent(cc.Graphics);
        ctx.rect(0,0,node.width,node.height);
        if (color === 'RED') {
            ctx.fillColor = this._red;
        } else {
            ctx.fillColor = this._blue;
        }
        ctx.lineWidth = 2;
        ctx.strokeColor = cc.Color.WHITE;
        ctx.stroke();
        ctx.fill();
    },
    ReDraw: function (node, color) {
        var ctx = node.getComponent(cc.Graphics);
        ctx.clear();
        ctx.rect(0,0,node.width,node.height);
        ctx.lineWidth = 2;
        ctx.fillColor = color;
        ctx.strokeColor = cc.Color.WHITE;
        ctx.stroke();
        ctx.fill();
    },

    CreateItems: function (target, type) {
        this.Items = [];
        this._target = target;
        this._targetType = type;
        for (var i = 0; i < 9; i++) {
            var qte_item = cc.instantiate(this.QTEItem); 
            this.Items.push(qte_item);
            this.node.addChild(qte_item, 1, 'QTE_' + i);
        }
        var index = Math.floor(Math.random() * 9);
        for (var i = 0; i < this.Items.length; i++) {
            if (i == index) {
                this.DrawQTEitem(this.Items[i],'BLUE');
                this.Items[i]._tag = 'BLUE';
            }
            else {
                this.DrawQTEitem(this.Items[i], 'RED');
                this.Items[i]._tag = 'RED';
            }
        }
        var aim_idnex = 0;
        var timeID = setInterval(() => {
            this.Items[aim_idnex++].getComponent(cc.Animation).play('QTEactive');
            if (aim_idnex >= 9) {
                clearInterval(timeID);
                this.BindLisenter();
            }
        }, 100);
        
    },

    BindLisenter: function () {
        this.node.children.forEach(e => {
            e.on('mousemove', () => {
                if (e._tag === 'RED') {
                    this.ReDraw(e, this._moveRed);
                } else {
                    this.ReDraw(e, this._moveBlue);
                }
            })
        });
        this.node.children.forEach(e => {
            e.on('mouseleave', () => {
                if (e._tag === 'RED') {
                    this.ReDraw(e, this._red);
                } else {
                    this.ReDraw(e, this._blue);
                }
            })
        })
        this.node.children.forEach(e => {
            e.on('mousedown', () => {
                if (e._tag === 'RED') {
                    this.ReDraw(e, this._pressRed);
                    this.SuppliseController.getSupplies(this._target, this._targetType, false);
                    this.UIController.ActiveTips("QTE失败!", cc.Color.RED);
                } else {
                    this.ReDraw(e, this._pressBlue);
                    this.SuppliseController.getSupplies(this._target, this._targetType, true);
                }
                this.Items.forEach(e => {
                    var qte = this.node;
                    var ele = e;
                    e.getComponent(cc.Animation).play('QTECancel');
                    e.getComponent(cc.Animation).on('finished',function () {
                        qte.removeAllChildren();
                        ele.destroy();
                    });
                })
            })
        })
        this.node.children.forEach(e => {
            e.on('mouseup', () => {
                if (e._tag === 'RED') {
                    this.ReDraw(e, this._moveRed);
                } else {
                    this.ReDraw(e, this._moveBlue);
                }
            })
        })
    }
});
