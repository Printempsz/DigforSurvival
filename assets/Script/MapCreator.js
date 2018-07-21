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
        brick: {
            default: null,
            type: cc.Prefab
        },
        border: {
            default: null,
            type: cc.Prefab
        },
        brickSize: {
            default: 50
        },
        player: {
            default: null,
            type: cc.Prefab
        },
        servants: {
            default: [],
            type: cc.Prefab
        },
        hammer: {
            default: null,
            type: cc.Prefab
        },
        HPbag: {
            default: null,
            type: cc.Prefab
        },
        _Game: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    init: function() {

    },

    start () {
        console.log("map")
        this._Game = cc.find("Game");
        var mapWidth = this.node.width;
        var mapHeight = this.node.height;
        var xNumbers = mapWidth/this.brickSize;
        var yNumbers = mapHeight/this.brickSize;
        for(var i = 0; i < xNumbers; i++) {
            var node = cc.instantiate(this.border);
            node.parent = this.node;
            node.setPosition(i * this.brickSize, 0);
        }
        for(var i = 0; i < xNumbers; i++) {
            var node = cc.instantiate(this.border);
            node.parent = this.node;
            node.setPosition(i * this.brickSize, mapHeight - this.brickSize);
        }
        for(var i = 1; i < yNumbers - 1; i++) {
            var node = cc.instantiate(this.border);
            node.parent = this.node;
            node.setPosition(0, i * this.brickSize);
        }
        for(var i = 1; i < yNumbers - 1; i++) {
            var node = cc.instantiate(this.border);
            node.parent = this.node;
            node.setPosition(mapWidth - this.brickSize, i * this.brickSize);
        }
        var map = [];
        for (var i = 0; i < yNumbers - 2; i++) {
            var line = []
            for (var j = 0; j < xNumbers - 2; j++) {
                line[j] = Math.random();
            }
            map.push(line);
        }
        for (var i = 1; i <= yNumbers - 2; i++) {
            for (var j = 1; j <= xNumbers - 2; j++) {
                if (map[i - 1][j - 1] >= 0.5) {
                    map[i - 1][j - 1] = 1;
                    var node = cc.instantiate(this.brick);
                    node.parent = this.node;
                    node.setPosition(j * this.brickSize, i * this.brickSize);
                } else {
                    map[i - 1][j - 1] = 0;
                }
            }
        }
        for (var i = 1; i <= xNumbers - 2; i++) {
            if (!map[yNumbers - 3][i - 1]) {
                map[yNumbers - 3][i - 1] = 1;
                var node = cc.instantiate(this._Game.getComponent('Game').player);
                var scene = cc.director.getScene();
                node.setPosition(i * this.brickSize + (this.brickSize / 2), (yNumbers - 2) * this.brickSize + (this.brickSize / 2));
                scene.addChild(node, 1, 'player');
                break;
            }
        }
        var servant_id = 0;
        var HPbag_id = 0;
        var hammer_id = 0;
        var scene = cc.director.getScene();
        var servantNode = new cc.Node();
        scene.addChild(servantNode, 1, 'Servants');
        for (var i = 1; i <= yNumbers - 2; i++) {
            for (var j = 1; j <= xNumbers - 2; j++) {
                if (!map[i - 1][j - 1]) {
                    var flag = Math.random();
                    if (flag <= 0.05) {
                        var index = Math.floor(Math.random() * this.servants.length);
                        var servant = cc.instantiate(this.servants[index]);
                        servant.tag = this.serventName(index);
                        servant.setPosition(j * this.brickSize + (this.brickSize / 2), i * this.brickSize + (this.brickSize / 2));
                        servantNode.addChild(servant, 1, 'Servant_' + this.serventName(index) + '_' + servant_id++);
                    }
                    else if (flag <= 0.1) {
                        var HPbag = cc.instantiate(this.HPbag);
                        HPbag.tag = 'HPbag';
                        HPbag.setPosition(j * this.brickSize + (this.brickSize / 2), i * this.brickSize + (this.brickSize / 2));
                        servantNode.addChild(HPbag, 1, 'HPbag_' + HPbag_id++);
                    }
                    else if (flag <= 0.15) {
                        var hammer = cc.instantiate(this.hammer);
                        hammer.tag = 'hammer';
                        hammer.setPosition(j * this.brickSize + (this.brickSize / 2), i * this.brickSize + (this.brickSize / 2));
                        servantNode.addChild(hammer, 1, 'hammer_' + HPbag_id++);
                    }
                }
            }
        }
        console.log(scene);
    },

    serventName: function (index) {
        switch (index) {
            case 0:
                return 'ATK'
            case 1:
                return 'DEF'
            case 2:
                return 'MG'
        }
    }

    // update (dt) {},
});
