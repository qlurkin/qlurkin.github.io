var Vilain = function (x,y) {
	var that = Drawable(x,y);
	that.width = 16;
	that.height = 16;
	that.draw = function (context) {
		//console.log(this.x);
		context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.width, this.height);
	};
	that.update = function (delta, speed) {
		this.x -= delta * speed;
	};

	return that;
};
