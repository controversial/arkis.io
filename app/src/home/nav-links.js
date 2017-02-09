const jump = require('../../../node_modules/jump.js/dist/jump');

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
