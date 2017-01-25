const mist = require('../home/mist.js');
require('./index.html');

const canvas = document.getElementById('mist');
const ctx = canvas.getContext('2d');

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
window.addEventListener('load', () => window.dispatchEvent(new Event('resize')));

/* eslint-disable no-param-reassign*/

function postRender(renderer) {
  renderer.ctx.globalCompositeOperation = 'destination-out';
  // Large radial gradient to cut out the center
  const gradientSize = Math.max(renderer.width(), renderer.height()) * 1.5;
  const maskGradient = renderer.ctx.createRadialGradient(
    (renderer.width() / 2), (renderer.height() / 2), 0,
    (renderer.width() / 2), (renderer.height() / 2), gradientSize,
  );
  maskGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  maskGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  renderer.ctx.fillStyle = maskGradient;
  renderer.ctx.fillRect(0, 0, renderer.width(), renderer.height() * 2);
}

/* eslint-enable no-param-reassign*/


window.mistSim = new mist.MistRenderer(ctx, 85, 25, postRender);
