var Bird = function (x) {
	var altitude = Math.floor(64 + Math.random() * 60);
	//var altitude = 120;
	var that = Vilain(x,altitude);
	that.width = 10;
	that.height = 8;
  var frame = 0;
  var AnimationSize = 4;
  var frameDuration = 3;
	that.draw = function (context) {
    //context.fillStyle = "red";
    //context.fillRect(that.x, that.y, that.width, that.height);
    var bird = Tiles.bird();
    context.drawImage(bird, Math.floor(frame/frameDuration)*(that.width+2), 0, that.width, that.height, that.x, that.y, that.width, that.height);

	};
	that.update = function (delta, speed) {
		this.x -= delta * (1.5*speed);
    frame = (frame + 1) % (AnimationSize*frameDuration);
	};

	return that;
};
