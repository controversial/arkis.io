const mist = require('./mist');

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
  const canvas = document.getElementById('mist');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.8;
});
window.addEventListener('load', () => window.dispatchEvent(new Event('resize')));


// After smoke is drawn, create a fade by using blend modes to create gradient opacity masks.
function postRender(renderer) {
  renderer.ctx.globalCompositeOperation = 'destination-out';

  // Short linear fade at the top
  const maskGradient1 = renderer.ctx.createLinearGradient(0, 0, 0, renderer.height() / 2);
  maskGradient1.addColorStop(0, 'rgba(255, 255, 255, 1)');
  maskGradient1.addColorStop(1, 'rgba(255, 255, 255, 0)');
  renderer.ctx.fillStyle = maskGradient1;
  renderer.ctx.fillRect(0, 0, renderer.width(), renderer.height() / 2);

  // Large radial gradient to cut out the top center in an arc
  const maskGradient2 = renderer.ctx.createRadialGradient(
    (renderer.width() / 2), 0, 0,
    (renderer.width() / 2), 0, (renderer.height() * 2),
  );
  maskGradient2.addColorStop(0, 'rgba(255, 255, 255, 1)');
  maskGradient2.addColorStop(1, 'rgba(255, 255, 255, 0)');
  renderer.ctx.fillStyle = maskGradient2;
  renderer.ctx.fillRect(0, 0, renderer.width(), renderer.height() * 2);
}


// Initialize simulation
window.addEventListener('load', () => {
  const canvas = document.getElementById('mist');
  const ctx = canvas.getContext('2d');
  window.mistSim = new mist.ParticleRenderer(ctx, 85, 25, 4, postRender);
  window.mistSim.start();
});
