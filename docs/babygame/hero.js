var Hero = function () {
  var jumpHeight = [40,80];
  var jumpDuration = [666,1333] ; //milisecond
  var A;
  var B;
  var C = 126;
  var t = jumpDuration[1];
  var frame = 0;
  var AnimationSize = 4;
  var frameDuration = 4;
  var jumpType = 0;
  var jumpStart = null;
  var jumpEnd = null;
  var jumpTime = 0;

  var that = Drawable(16, C);

  that.width = 13;
  that.height = 18;

  that.draw = function (context) {
    //context.fillStyle = "green";
    //context.fillRect(that.x, that.y, that.width, that.height);
    var charly = Tiles.charly();
    context.drawImage(charly, Math.floor(frame/frameDuration)*(that.width+3), 0, that.width, that.height, that.x, that.y, that.width, that.height);
  };

  var computeParabola = function () {
      A = ((4*getJumpHeight())/(getJumpDuration()*getJumpDuration()));
      B = (-A * getJumpDuration());
      //console.log(A, B);
  };


  var height = function () {
    if(t>getJumpDuration()) return C;
    //console.log(t);
    return A*t*t+B*t+C;
  }

  that.update = function (delta, speed) {
    if(t<=getJumpDuration()) t += delta;
    that.y = height();
    //console.log(that.y);
    frame = (frame + 1) % (AnimationSize*frameDuration);
    computeJumpTime();
    computeParabola();
  }

  that.jump = function () {
    if(t>getJumpDuration()) {
      //console.log('jump');
      jumpTime = 0;
      t=0;
      jumpStart = new Date().getTime();
      jumpEnd = null;
    }
  };

  var computeJumpTime = function () {
    if(jumpEnd === null) {
      jumpTime = new Date().getTime() - jumpStart;
    }
    else {
      jumpTime = jumpEnd - jumpStart
    }
  };

  that.jumpStop = function () {
    if(jumpStart !== null && jumpEnd === null) {
      jumpEnd = new Date().getTime();
      //console.log(jumpEnd - jumpStart);
    }
  };

  var getA = function () {
    return interpolate(A[0], A[1], 150, 300);
  }

  var getB = function () {
    return interpolate(B[0], B[1], 150, 300);
  }

  var getJumpHeight = function () {
    return interpolate(jumpHeight[0], jumpHeight[1], 150, 300);
  }

  var getJumpDuration = function () {
    res = interpolate(jumpDuration[0], jumpDuration[1], 150, 300);
    //console.log(res);
    return res;
  }

  var interpolate = function (min, max, minTime, maxTime) {
    if(jumpTime < minTime) return min;
    if(jumpTime < maxTime) {
      var progress = (jumpTime-minTime)/(maxTime-minTime);
      return min*(1-progress) + max*progress;
    }
    return max;
  }

  computeParabola();
  return that;
}
