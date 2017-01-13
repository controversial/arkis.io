require('./intro-anim.sass');

const isTouchDevice = 'ontouchstart' in document.documentElement;
const ev = isTouchDevice ? 'touchend' : 'click';
const delay = isTouchDevice ? 1050 : 550;

document.getElementById('corners').addEventListener(ev, () => setTimeout(() => {
  console.log('Animation finished');
}, delay));
