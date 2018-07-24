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

    MapCreator: function (map, SupplisePosition) {
        // console.log("map")
        this._Game = cc.find("Game");
        var mapWidth = this.MapWidth;
        var mapHeight = this.MapHeight;
        this.node.width = mapWidth;
        this.node.height = mapHeight;
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

        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                if (map[i][j] === 1) {
                    var node = cc.instantiate(this.brick);
                    node.setPosition((j + 1) * this.brickSize, (i + 1) * this.brickSize);
                    this.node.addChild(node, 1, 'brick_' + i + '_' + j);
                }
            }
        }

        var scene = cc.director.getScene();
        var servantNode = new cc.Node();
        servantNode.x = 0;
        servantNode.y = 0;
        scene.addChild(servantNode, 1, 'Servants');

        for (var i = 0; i < SupplisePosition.length; i++) {
            if (SupplisePosition[i].type === 'ATK') {
                var servant = cc.instantiate(this.servants[0]);
                servant.tag = this.serventName(0);
                servant.setPosition(SupplisePosition[i].x, SupplisePosition[i].y);
                servantNode.addChild(servant, 1, SupplisePosition[i].name);
            } else if (SupplisePosition[i].type === 'DEF') {
                var servant = cc.instantiate(this.servants[1]);
                servant.tag = this.serventName(1);
                servant.setPosition(SupplisePosition[i].x, SupplisePosition[i].y);
                servantNode.addChild(servant, 1, SupplisePosition[i].name);
            } else if (SupplisePosition[i].type === 'MG') {
                var servant = cc.instantiate(this.servants[2]);
                servant.tag = this.serventName(2);
                servant.setPosition(SupplisePosition[i].x, SupplisePosition[i].y);
                servantNode.addChild(servant, 1,SupplisePosition[i].name);
            } else if (SupplisePosition[i].type === 'HPbag') {
                var HPbag = cc.instantiate(this.HPbag);
                HPbag.tag = 'HPbag';
                HPbag.setPosition(SupplisePosition[i].x, SupplisePosition[i].y);
                servantNode.addChild(HPbag, 1, SupplisePosition[i].name);
            } else if (SupplisePosition[i].type === 'HM') {
                var hammer = cc.instantiate(this.hammer);
                hammer.tag = 'hammer';
                hammer.setPosition(SupplisePosition[i].x, SupplisePosition[i].y);
                servantNode.addChild(hammer, 1, SupplisePosition[i].name);
            }
        }
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
    },
     
    PlayerCreator: function (playerPosition, name) {
        var player = cc.instantiate(this._Game.getComponent('Game').player);
        player.getChildByName('name').getComponent(cc.Label).string = name;
        var scene = cc.director.getScene();
        player.setPosition(playerPosition.x, playerPosition.y);
        scene.addChild(player, 1, 'player');
    },

    deleteBrick: function (data) {
        console.log("delete")
        console.log(data)
        this.node.getChildByName(data).destroy()
    }

    // update (dt) {},
});
