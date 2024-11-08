var Drawable = function (x, y) {
  var that = {}
  that.x = x;
  that.y = y;
  that.draw = function (context) {
    context.fillStyle = "black";
    context.fillRect(this.x-0.005, this.y-0.005, 0.01, 0.01);
  }

  return that;
}
