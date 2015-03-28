var BackgroundLayer = cc.Layer.extend({
	map00:null,
	map01:null,
	mapWidth:0,
	mapIndex:0,
	space:null,
	spriteSheet:null,
	objects:[],
	obstacle: null,

	ctor:function (space) {
		this._super();
		this.objects = [];
		this.space = space;
		this.init();
	},
	initObstacles : function(map) {
		this.obstacles = [];
		var mapWidth = map.getMapSize().width;
		var mapHeight = map.getMapSize().height;
		var tileWidth = map.getTileSize().width;
		var tileHeight = map.getTileSize().height;
		var collidableLayer = map.getLayer("collidable");
		var i, j;
		for (i = 0; i < mapWidth; i++){
			for (j = 0; j < mapHeight; j++){
				var tileCoord = new cc.Point(i, j);
				var gid = collidableLayer.getTileGIDAt(tileCoord);
				if(gid) {
					var tileXPositon = i * tileWidth;
					var tileYPosition = (mapHeight * tileHeight) - ((j+1) * tileHeight);
					var react = cc.rect(tileXPositon, tileYPosition, tileWidth, tileHeight);
					this.obstacles.push(react);
				}
			}
		}
	},
	init:function () {
		this.map00 = cc.TMXTiledMap.create(res.map_tmx);
		var objGroup = this.map00.getObjectGroup('objects');
		var obj = objGroup.getObject('role');
		g_runnerStartX = obj.x;
		g_runnerStartY = obj.y;

		this.initObstacles(this.map00);

		this.addChild(this.map00);

		this.mapWidth = this.map00.getContentSize().width;
		this.scheduleUpdate();
	},
	checkAndReload:function (eyeX) {
		var newMapIndex = parseInt(eyeX / this.mapWidth);
		if (this.mapIndex == newMapIndex) {
			return false;
		}

		if (0 == newMapIndex % 2) {
			//this.map01.setPositionX(this.mapWidth * (newMapIndex + 1));
		} else {
			// change mapFirst
			this.map00.setPositionX(this.mapWidth * (newMapIndex + 1));
		}
		this.mapIndex = newMapIndex;

		return true;
	},

	update:function () {
		var animationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
		var eyeX = animationLayer.getEyeX();
		this.checkAndReload(eyeX);

	}
});
