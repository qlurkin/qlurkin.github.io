var App = (function () {
  that = {};

  var objects = [];
  var hero = null;
  var speed = 0;
  var context = null;
  var bottom = 0;
  var top = 0;
  var left = 0;
  var right = 0;
  const DESCRIPTION = 0;
  const RUNNING = 1;
  const ANNOUNCEMENT = 2;
  const OVER = 3;
  const SCORE = 6;
  const CREDITS = 7;
  var state = DESCRIPTION;
  var score = 0;
  var announced = false;
  var jumpSound = null;
  var music = null;
  var pause = false;
  var hold = true;
  var goal = 300;

  var switchState = function (s) {
    var body = document.getElementsByTagName('body')[0];
    if(s == DESCRIPTION) {
      body.className = 'description';
      console.log('description');
      score = 0;
      speed = 0.05;
      objects = objects.slice(0,3);
      announced = false;
      hold = true;
      showBulle("Salut c'est Charly, si on court " + goal + "m, je te dirai un truc super!");
    }

    if(s == RUNNING) {
      body.className = 'running';
      hideBulle();
      //music.play();
    }

    if(s == ANNOUNCEMENT) {
      body.className = 'announcement';
      announced = true;
      document.getElementById("credits").className = 'announced';
      showBulle("Je vais avoir un petit frère en mai. Chouette !");
      setTimeout(function () {
        hold = false;
      }, 1000);
    }

    if(s == SCORE) {
      body.className = 'score';
    }

    if(s == OVER) {
      body.className = 'over';
      showBulle("Game Over");
      //music.pause();
    }

    if(s == CREDITS) {
      body.className = 'credits';
      console.log('credits');
      //music.pause();
    }

    state = s;
  };

  var colliding = function (rect1, rect2) {
    if(rect1.x < rect2.x + rect2.width-2 &&
      rect1.x + rect1.width-2 > rect2.x &&
      rect1.y < rect2.y + rect2.height-2 &&
      rect1.height-2 + rect1.y > rect2.y) {
          return true;
    }
    return false;
  };

  var isOver = function () {
    var i = 3;
    while(i < objects.length) {
      if(colliding(objects[i], objects[2])) return true;
      i++;
    }
    return false;
  }

  var isCanvasSupported =  function () {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  };

  var showBulle = function (msg) {
    var overlay = document.getElementById('overlay');
    var content = document.getElementById('bulle-content');
    content.innerHTML = msg
    overlay.style.opacity = "1";
  };

  var hideBulle = function () {
    var overlay = document.getElementById('overlay');
    overlay.style.opacity = "0";
  };

  var spawnVilain = function () {

    if(state == RUNNING && !pause) {
      var hazard = Math.random();
      //var hazard = 1;
      if(hazard < 0.4) {
        objects.push(Bird(right));
      }
      else if(hazard < 0.8){
        objects.push(Dog(right));
      }
      else {
        objects.push(Cat(right));
      }
    }
    var time = 1500 + Math.random()*2000;
    setTimeout(spawnVilain, time);
  };

  var draw = function () {
    for(var i=0; i<objects.length; i++) {
      objects[i].draw(context);
    }
  };

  var update = function (delta) {
    //var delta = thisCall - prevCall;
    if(objects.length > 3 && objects[3].x+objects[3].width < left) objects.splice(3,1);
    for(var i=0; i<objects.length; i++) {
      if(state == RUNNING) objects[i].update(delta, speed);
    }
    if(state == RUNNING) score += delta*speed/20;
    document.getElementById("score").innerHTML = Math.floor(score) + "m";
  };

  var loop = function () {
    if(state == RUNNING && isOver()) switchState(OVER);
    if(state == RUNNING && score > goal && !announced) switchState(ANNOUNCEMENT);
    if(state == RUNNING) speed *= 1.0001;
  };



  var start = null;
  var run = function () {
    function frame(timestamp) {
      if (start === null) start = timestamp;
      delta = timestamp - start;
      if(pause) {
        delta = 0;
        console.log('pause');
      }
      update(delta);
      draw();
      loop();
      start = timestamp;
      requestAnimationFrame(frame);
    }
    frame(0);
  };

  that.initCanvas = function () {
    var div = document.getElementById("canvas");
    if(div.offsetHeight < div.offsetWidth) {
      var height = 160;
      var width = 160 * div.offsetWidth / div.offsetHeight;
      var safeOffsetY = 0;
      var safeOffsetX = (width - 160) / 2;
    }
    else {
      var width = 160;
      var height = 160 * div.offsetHeight / div.offsetWidth;
      var safeOffsetX = 0;
      var safeOffsetY = (height - 160) / 2;
    }

    top = -safeOffsetY;
    bottom = 160 + safeOffsetY;
    left = -safeOffsetX;
    right = 160 + safeOffsetX;

    div.innerHTML = "<canvas id='viewport' width='" + width + "' height='" + height + "'></canvas>";
    var canvas = document.getElementById('viewport');
    context = canvas.getContext("2d");
    //context.scale(safeLength/160, safeLength/160);
    context.translate(safeOffsetX, safeOffsetY);
  };

  that.init = function () {
    if(performance === undefined || !isCanvasSupported()) {
      alert("Navigateur non supporté");
      return;
    }

    that.initCanvas();
    hero = Hero();
    objects.push(Background());
    objects.push(Ground());
    objects.push(hero);
    run();
    spawnVilain();
    jumpSound = document.getElementById("jump");
    music = document.getElementById("music");
    switchState(DESCRIPTION);
  };

  that.jumpStart = function () {
    music.play();
    if(state == RUNNING) {
      jumpSound.play();
      hero.jump();
      return;
    }
    if(state == DESCRIPTION){
      switchState(RUNNING);
      return;
    }
    if(state == ANNOUNCEMENT && !hold){
      switchState(RUNNING);
      return;
    }
    if(state == OVER){
      switchState(CREDITS);
      return;
    }
    if(state == CREDITS){
      switchState(DESCRIPTION);
      return;
    }
  };

  that.jumpEnd = function () {
      if(state == RUNNING) hero.jumpStop();
  };

  that.getLeft = function () {
    return left;
  };

  that.getRight = function () {
    return right;
  };

  that.getTop = function () {
    return top;
  };

  that.getBottom = function () {
    return bottom;
  };

  that.getWidth = function () {
    return right - left;
  };

  that.getHeight = function () {
    return bottom - top;
  };

  that.pause = function() {
    music.pause();
    pause = true;
    start = null;
  }

  that.resume = function () {
    music.play();
    pause = false;
    start = null;
  }

  return that;
})();
