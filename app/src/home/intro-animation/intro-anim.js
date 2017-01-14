require('./intro-anim.sass');

const isTouchDevice = 'ontouchstart' in document.documentElement;
const ev = isTouchDevice ? 'touchend' : 'click';
const delay = isTouchDevice ? 1050 : 550;

// Make the logo interactable after the animation is finished
setTimeout(() => {
  const logo = document.getElementById('animated-logo');
  const cornersDiv = document.getElementById('corners');
  cornersDiv.className = 'interactable';

  // Click event triggers animations on the elements

  cornersDiv.addEventListener(ev, () => setTimeout(() => {
    logo.className = 'clicked';
    // Set display: none on logo
    setTimeout(() => {
      logo.style.display = 'none';
    }, 1000);
  }, delay));
}, 3750);
