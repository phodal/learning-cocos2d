var GameController = function (layer) {
	this.init(layer);
};

GameController.prototype = {
	init: function (layer) {

	},
	startUI: function(sender){
		cc.director.pushScene(new StatusScene())
	},
	cleanScene: function (sender) {
	},
	settingGame: function(sender) {
		this.startUI(sender);
	},
	startGame: function(sender) {
		this.cleanScene(sender);
		this.startUI(sender);
	}
};
