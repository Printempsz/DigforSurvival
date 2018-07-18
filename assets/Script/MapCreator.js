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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
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
                    var node = cc.instantiate(this.brick);
                    node.parent = this.node;
                    node.setPosition(j * this.brickSize, i * this.brickSize);
                }
            }
        }
    },

    // update (dt) {},
});
