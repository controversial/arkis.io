const canvas = document.getElementById('mist');
const ctx = canvas.getContext('2d');

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.8;

  ctx.fillStyle = 'white';
  ctx.font = `${canvas.height}px Arial`;
  ctx.fillText('Hi', 10, canvas.height);


  // Make everything faded with a gradient

  ctx.globalCompositeOperation = 'destination-in';

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

window.addEventListener('load', () => window.dispatchEvent(new Event('resize')));
