require('./intro-anim.sass');

const isTouchDevice = 'ontouchstart' in document.documentElement;
const ev = isTouchDevice ? 'touchend' : 'click';
const delay = isTouchDevice ? 1050 : 550;

document.getElementById('animated-logo').addEventListener(ev, () => setTimeout(() => {
  document.getElementById('animated-logo').className = 'clicked';
}, delay));
