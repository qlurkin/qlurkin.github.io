var Ground = function () {
  var that = {};

  var offset = 0;
  var pattern = null;

  that.update = function (delta, speed) {
    offset -= delta * speed;
    while(offset < -16) offset += 16;
  };

  that.draw = function (context) {
    context.translate(offset, 144);

    if(pattern===null) {
      var ground = Tiles.ground();
      pattern=context.createPattern(ground,"repeat");
    }
    context.fillStyle = pattern;
    context.fillRect(App.getLeft(), 0, App.getWidth()+16, App.getBottom()-144);

    context.translate(-offset, -144);
  };

  return that;
};
