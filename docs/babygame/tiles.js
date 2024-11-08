var Tiles = (function () {
  that = {};
  var ground = document.getElementById("ground");
  that.ground = function () {
    return ground;
  };

  var background = document.getElementById("background");
  that.background = function () {
    return background;
  };

  var charly = document.getElementById("charly");
  that.charly = function () {
    return charly;
  };

  var bird = document.getElementById("bird");
  that.bird = function () {
    return bird;
  };

  var cactus = document.getElementById("cactus");
  that.cactus = function () {
    return cactus;
  };

  var cat = document.getElementById("cat");
  that.cat = function () {
    return cat;
  };

  var dog = document.getElementById("dog");
  that.dog = function () {
    return dog;
  };

  return that;
})();
