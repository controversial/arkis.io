const jump1 = require('../../../node_modules/jump.js/dist/jump');

function jump(a, b) {
  window.mobileMenu.close();
  return jump1(a, b);
}

let topBar;

window.jumpToTop = () => jump(
  -window.scrollY,
  { duration: Math.abs },
);

window.jumpToTeam = () => jump(
  '.team-section',
  { duration: Math.abs, offset: -topBar.offsetHeight },
);

window.jumpToContact = () => jump(
  '#map',
  { duration: Math.abs, offset: -topBar.offsetHeight },
);

document.addEventListener('DOMContentLoaded', () => {
  topBar = document.querySelector('.top-bar');
});
