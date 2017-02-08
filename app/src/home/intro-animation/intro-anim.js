require('./intro-anim.sass');
const cascadeFadeIn = require('../build');

const isTouchDevice = 'ontouchstart' in document.documentElement;
const ev = isTouchDevice ? 'touchend' : 'click';
const delay = isTouchDevice ? 1050 : 550;


// Timed functions for interaction with animated logo

setTimeout(() => {
  // Make the logo interactable after the initial animation is finished

  const logo = document.getElementById('animated-logo');
  const cornersDiv = document.getElementById('corners');
  cornersDiv.classList.add('interactable');

  // Click event triggers further animations on the elements

  cornersDiv.addEventListener(ev, () => setTimeout(() => {
    logo.classList.add('clicked');
    // Set display: none on logo
    setTimeout(() => {
      logo.style.display = 'none';
      cascadeFadeIn();
      window.map.resize();
    }, 1000);
  }, delay));
}, 3750);
