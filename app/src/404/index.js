require('./index.html');
require('./main.sass');

const mist = require('../home/mist.js');

const canvas = document.getElementById('mist');
const ctx = canvas.getContext('2d');

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
window.addEventListener('load', () => window.dispatchEvent(new Event('resize')));


function postRender(renderer) {
  renderer.ctx.globalCompositeOperation = 'destination-out';
  renderer.ctx.translate(renderer.width() / 2, renderer.height() / 2);
  renderer.ctx.scale(1.25, 0.5);
  // Large radial gradient to cut out the center
  const maskGradient = renderer.ctx.createRadialGradient(
    0, 0, 0,
    0, 0, renderer.width() / 2,
  );
  maskGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  maskGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  renderer.ctx.fillStyle = maskGradient;
  renderer.ctx.fillRect(
    -renderer.width() / 2,
    -renderer.height(),
    renderer.width(),
    renderer.height() * 2,
  );
  renderer.ctx.scale(0.8, 2);
  renderer.ctx.translate(-(renderer.width() / 2), -(renderer.height() / 2));
}


window.addEventListener('load', () => {
  window.mistSim = new mist.ParticleRenderer(ctx, 100, 25, 0.5, postRender);
  window.mistSim.start();
});
