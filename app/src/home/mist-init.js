const mist = require('./mist.js');

window.addEventListener('resize', () => {
  const canvas = document.getElementById('mist');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.8;
});

window.addEventListener('load', () => window.dispatchEvent(new Event('resize')));

window.addEventListener('load', () => {
  const canvas = document.getElementById('mist');
  const ctx = canvas.getContext('2d');
  window.mistSim = new mist.ParticleRenderer(ctx, 85, 25);
  window.mistSim.start();
});
