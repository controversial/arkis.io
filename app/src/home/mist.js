// Load mist textures

let numTexturesLoaded = 0;
let texturesLoaded = false;

// Paths to all the mist particle textures
const texturePaths = [
  require('./textures/mist-particle-1.png'),
  require('./textures/mist-particle-2.png'),
  require('./textures/mist-particle-3.png'),
  require('./textures/mist-particle-4.png'),
  require('./textures/mist-particle-5.png'),
];

// Array of Image objects, one for each mist particle texture
const textures = texturePaths.map(() => new Image());

// Called when a mist particle texture finishes loading to be able to tell when all mist particles
// have loaded.
function textureLoadCallback() {
  numTexturesLoaded += 1;
  if (numTexturesLoaded === texturePaths.length) {
    texturesLoaded = true;
  }
}

// Assign a mist particle texture to each Image object
for (let i = 0; i < textures.length; i += 1) {
  textures[i].addEventListener('load', textureLoadCallback());
  textures[i].src = texturePaths[i];
}

// Helper functions


// My [].fill polyfill
if (!Array.prototype.fill) {
  /* eslint-disable no-extend-native */
  Array.prototype.fill = (value) => {
    for (let i = 0; i < this.length; i += 1) {
      this[i] = value;
    }
    return this;
  };
  /* eslint-enable no-extend-native */
}

/** Return a random number between `low` and `high` */
function random(low, high) {
  return (Math.random() * (high - low)) + low;
}

/** Return a random integer between `low` and `high-1` */
function randint(low, high) {
  return Math.floor(random(low, high));
}

/** Return a random item from an array */
function randchoice(array) {
  return array[randint(0, array.length)];
}

/** Implements basic particle physics (moving and bouncing) */
class Particle {
  /**
   * Create a new particle in a simulation.
   * Particles have positions and velocities, and remember which renderer they're bound to.
   * @param {ParticleRenderer} renderer - the ParticleRender that the particle belongs to.
   * @param {number} x - the initial X position of the particle
   * @param {number} y - the initial Y position of the particle
   * @param {number} vx - the initial X velocity of the particle
   * @param {number} vy - the initial Y velocity of the particle
   */
  constructor(renderer, x, y, vx, vy, image) {
    this.renderer = renderer;
    // Image object for mist particle texture. Not used by Particle, used by ParticleRenderer
    this.image = image;

    this.x = x;    // X position on canvas
    this.y = y;    // Y position on canvas
    this.vx = vx;  // X velocity
    this.vy = vy;  // Y velocity
  }

  /** Advance the simulation by one step */
  step() {
    // Bounce particles when they hit the edges of the canvas
    if (this.x < 0 || this.x >= this.renderer.width()) {
      this.bounceX();
    }
    if (this.y < 0 || this.y >= this.renderer.height()) {
      this.bounceY();
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  /** Cause the current particle to bounce in the X direction */
  bounceX() {
    this.vx = -1 * this.vx;
  }

  /** Cause the current particle to bounce in the Y direction */
  bounceY() {
    this.vy = -1 * this.vy;
  }
}


/** Orchestrates and renders particles */
class ParticleRenderer {
  /**
   * Create a new particle renderer.
   * @param {CanvasRenderingContext2D} ctx - the rendering context of the canvas to draw on
   * @param {number} particleCount - the number of particles to maintain in the simulation
   */
  constructor(ctx, particleCount) {
    this.ctx = ctx;
    this.particleCount = particleCount;

    this.particles = new Array(this.particleCount).fill(0).map(() => new Particle(
      this,
      randint(0, this.width()),   // X position
      randint(0, this.height()),  // Y position
      randint(0, 5),              // X velocity
      randint(0, 5),              // Y velocity
      randchoice(textures),       // Random choice of the mist particle textures
    ));
  }

  /**
   * Draw the particles on the canvas
   */
  draw() {
    if (texturesLoaded) {
      this.ctx.clearRect(0, 0, this.width(), this.height());
      this.particles.forEach((p) => {
        this.ctx.fillStyle = 'green';
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI, false);
        this.ctx.fill();
      });
    }
  }

  /**
   * Advance the simulation by one step
   */
  step() {
    this.particles.forEach(particle => particle.step());
  }

  /**
   * Begin a render loop
   */
  start() {
    // TODO
    this.interval = setInterval(() => {
      this.step();
      requestAnimationFrame(() => { this.draw(); });
    }, 100);
  }

  /**
   * Get the width of the canvas coordinate system.
   * @return {number} the width of the canvas
   */
  width() {
    return this.ctx.canvas.width;
  }

  /**
   * Get the height of the canvas coordinate system
   * @return {number} the height of the canvas
   */
  height() {
    return this.ctx.canvas.height;
  }
}


window.addEventListener('resize', () => {
  const canvas = document.getElementById('mist');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.8;
});

window.addEventListener('load', () => window.dispatchEvent(new Event('resize')));

window.addEventListener('load', () => {
  const canvas = document.getElementById('mist');
  const ctx = canvas.getContext('2d');
  window.mistSim = new ParticleRenderer(ctx, 10);
});
