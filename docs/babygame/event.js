window.addEventListener("resize", function (event) {
  App.initCanvas();
}, false);

var isKeyDown = false; //for auto-repeat handling
document.addEventListener('keydown', function (event) {
  if(event.key === ' ' || event.key === 'ArrowUp') {
    if(!isKeyDown) //for auto-repeat handling
      App.jumpStart();
    isKeyDown = true; //for auto-repeat handling
  }
  event.preventDefault();
}, false);

document.addEventListener('keyup', function (event) {
  if(event.key === ' ' || event.key === 'ArrowUp') {
    App.jumpEnd();
    isKeyDown = false; //for auto-repeat handling
  }
  event.preventDefault();
}, false);

document.addEventListener('mousedown', function (event) {
  App.jumpStart();
  event.preventDefault();
}, false);

document.addEventListener('mouseup', function (event) {
  App.jumpEnd();
  event.preventDefault();
}, false);

document.addEventListener('touchstart', function (event) {
  App.jumpStart();
  event.preventDefault();
}, false);

document.addEventListener('touchend', function (event) {
  App.jumpEnd();
  event.preventDefault();
}, false);

window.addEventListener('visibilitychange', function (event) {
  if(document.visibilityState === "hidden") {
    App.pause();
  }
  if(document.visibilityState === "visible") {
    App.resume();
  }

}, false);
