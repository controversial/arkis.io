require('./intro-anim.sass');
const cascadeFadeIn = require('../build');

// const isTouchDevice = 'ontouchstart' in document.documentElement;
// const ev = isTouchDevice ? 'touchend' : 'click';
// const delay = isTouchDevice ? 1050 : 550;


// Timed functions for interaction with animated logo

setTimeout(() => {
  // Make the logo interactable after the initial animation is finished

  const logo = document.getElementById('animated-logo');
  logo.style.display = 'none';
  cascadeFadeIn();
}, 6000);
