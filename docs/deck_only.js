var Deck = (function (exports) {
  'use strict';

  function setHash(str) {
    if (history.replaceState) {
      history.replaceState(null, null, '#' + str);
    } else {
      window.location.hash = '#' + str;
    }
  }

  let count = 0;
  let current = 0;
  let mode = '';

  const touch = {};

  function touchStart(event) {
    if (event.changedTouches.length == 1) {
      touch.x = event.changedTouches[0].clientX;
      touch.y = event.changedTouches[0].clientY;
    }
  }

  function touchEnd(event) {
    const v = {};
    if (event.changedTouches.length == 1) {
      v.x = event.changedTouches[0].clientX - touch.x;
      v.y = event.changedTouches[0].clientY - touch.y;

      if (Math.abs(v.x) > 4 * Math.abs(v.y)) {
        if (v.x > 0) {
          previousSlide();
        } else {
          nextSlide();
        }
      }
    }
  }

  function addTouchNavigation() {
    document.addEventListener('touchstart', touchStart);
    document.addEventListener('touchend', touchEnd);
  }

  function removeTouchNavigation() {
    document.removeEventListener('touchstart', touchStart);
    document.removeEventListener('touchend', touchEnd);
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.body.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  function initNavigation() {
    document.addEventListener('keydown', (event) => {
      if (
        ['ArrowRight', 'ArrowDown', 'KeyS', 'KeyD', 'Space'].includes(event.code)
      ) {
        event.preventDefault();
        nextSlide();
      } else if (['ArrowLeft', 'ArrowUp', 'KeyW', 'KeyA'].includes(event.code)) {
        event.preventDefault();
        previousSlide();
      } else if (event.key === 'm') {
        event.preventDefault();
        toggleView();
      } else if (event.key === 'f') {
        toggleFullScreen();
      }
    });

    document.querySelector('h1').addEventListener('click', () => {
      toggleView();
    });

    window.addEventListener('orientationchange', (event) => {
      setModeBasedOnOrientation();
    });
  }

  function setClass(slideNumber, className) {
    const slide = document.getElementById('slide-' + slideNumber);
    if (slide.classList.contains(className)) return

    for (let cl of [
      'deck-after',
      'deck-next',
      'deck-before',
      'deck-current',
      'deck-previous',
    ]) {
      slide.classList.remove(cl);
    }

    slide.classList.add(className);
  }

  function setClasses() {
    for (let i = 1; i <= count; i++) {
      if (i < current - 1) {
        setClass(i, 'deck-before');
      } else if (i == current - 1) {
        setClass(i, 'deck-previous');
      } else if (i == current) {
        setClass(i, 'deck-current');
      } else if (i == current + 1) {
        setClass(i, 'deck-next');
      } else {
        setClass(i, 'deck-after');
      }
    }
  }

  function setModeBasedOnOrientation() {
    if (screen.orientation) {
      if (screen.orientation.type.startsWith('portrait')) {
        documentMode();
      } else {
        deckMode();
      }
    } else {
      deckMode();
    }
  }

  function initDeck() {
    document
      .querySelector('meta[name="viewport"]')
      .setAttribute(
        'content',
        'initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
      );

    current = 1;
    if (
      window.location.hash.length > 0 &&
      window.location.hash.startsWith('#slide-')
    ) {
      current = parseInt(window.location.hash.slice('#slide-'.length), 10);
    } else {
      setHash('slide-' + current);
    }

    const slides = document.querySelectorAll('body>section, body>header');

    let i = 1;
    slides.forEach((slide) => {
      slide.id = 'slide-' + i;
      i++;
    });

    count = slides.length;

    setClasses();
    initNavigation();
    setModeBasedOnOrientation();
  }

  function currentSlide() {
    return current
  }

  function getSlideCount() {
    return count
  }

  function nextSlide() {
    setCurrent(current + 1);
  }

  function previousSlide() {
    setCurrent(current - 1);
  }

  function setCurrent(i) {
    if (i < 1) i = 1;
    if (i > count) i = count;
    if (i == current) return
    current = i;
    setClasses();
    setHash('slide-' + i);
  }

  function toggleView() {
    if (mode === 'document') {
      deckMode();
    } else {
      documentMode();
    }
  }

  function documentMode() {
    document.body.classList.remove('mode-deck');
    document.body.classList.add('mode-document');
    mode = 'document';
    removeTouchNavigation();
  }

  function deckMode() {
    document.body.classList.add('mode-deck');
    document.body.classList.remove('mode-document');
    mode = 'deck';
    addTouchNavigation();
  }

  initDeck();

  exports.currentSlide = currentSlide;
  exports.deckMode = deckMode;
  exports.documentMode = documentMode;
  exports.getSlideCount = getSlideCount;
  exports.initDeck = initDeck;
  exports.nextSlide = nextSlide;
  exports.previousSlide = previousSlide;
  exports.setCurrent = setCurrent;
  exports.toggleView = toggleView;

  return exports;

})({});
