var Dog = function (x) {
	var that = Vilain(x,134);
	that.width = 16;
	that.height = 10;
  var frame = 0;
  var AnimationSize = 6;
  var frameDuration = 5;
	that.draw = function (context) {
    //context.fillStyle = "red";
    //context.fillRect(that.x, that.y, that.width, that.height);
    var dog = Tiles.dog();
    context.drawImage(dog, Math.floor(frame/frameDuration)*(that.width+2), 0, that.width, that.height, that.x, that.y, that.width, that.height);

	};
	that.update = function (delta, speed) {
		this.x -= delta * (1.2*speed);
    frame = (frame + 1) % (AnimationSize*frameDuration);
	};

	return that;
};
