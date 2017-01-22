const canvas = document.getElementById('mist');
const ctx = canvas.getContext('2d');

class Particle {
  constructor(renderer, x, y, vx, vy) {
    this.renderer = renderer;
    this.x = x;     // X position on canvas
    this.y = y;    // Y position on canvas
    this.vx = vx;  // X velocity
    this.vy = vy;  // Y velocity
  }

  step() {
    // Bounce particles when they hit the edges of the canvas
    if (this.x < 0 || this.x >= this.renderer.width) {
      this.bounceX();
    }
    if (this.y < 0 || this.y >= this.renderer.height) {
      this.bounceY();
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  bounceX() {
    this.vx = -1 * this.vx;
  }

  bounceY() {
    this.vy = -1 * this.vy;
  }
}

class ParticleRenderer {

}

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
