var Cat = function (x) {
	var that = Vilain(x,128);
	that.width = 21;
	that.height = 16;
  var frame = 0;
  var AnimationSize = 6;
  var frameDuration = 2;

	that.draw = function (context) {
    //context.fillStyle = "red";
    //context.fillRect(that.x, that.y, that.width, that.height);
    var cat = Tiles.cat();
    context.drawImage(cat, Math.floor(frame/frameDuration)*(that.width+2)+1, 0, that.width, that.height, that.x, that.y, that.width, that.height);

	};
	that.update = function (delta, speed) {
		this.x -= delta * (1.8*speed);
    frame = (frame + 1) % (AnimationSize*frameDuration);
	};

	return that;
};
