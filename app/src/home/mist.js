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
  textures[i].addEventListener('load', textureLoadCallback);
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

/** Return a random item from an array */
function randchoice(array) {
  return array[Math.floor(random(0, array.length))];
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
   * @param {number} vrot - the initial rotational velocity of the particle (degrees)
   * @param {Image} image - An image object for the mist particle texture
   */
  constructor(renderer, x, y, vx, vy, vrot, image) {
    this.renderer = renderer;
    // Image object for mist particle texture. Not used by Particle, used by ParticleRenderer
    this.image = image;

    this.rot = 0;      // Rotation (in degrees)
    this.x = x;        // X position on canvas
    this.y = y;        // Y position on canvas
    this.vx = vx;      // X velocity
    this.vy = vy;      // Y velocity
    this.vrot = vrot;  // Rotational velocity
  }

  /** Advance the simulation by one step */
  step() {
    const marginX = this.image.width / 2;
    const marginY = this.image.height / 2;

    // Bounce particles when they hit the edges of the canvas
    if (this.x < -marginX || this.x >= this.renderer.width() + marginX) {
      this.bounceX();
    }
    if (this.y < -marginY || this.y >= this.renderer.height() + marginY) {
      this.bounceY();
    }

    // Stay in bounds (necessary when window resizes to be smaller)
    this.reignIn();

    // Move
    this.x += this.vx;
    this.y += this.vy;

    // Rotate
    this.rot += this.vrot;
    this.rot %= 360;
  }

  /** Cause the current particle to bounce in the X direction */
  bounceX() {
    this.vx = -1 * this.vx;
  }

  /** Cause the current particle to bounce in the Y direction */
  bounceY() {
    this.vy = -1 * this.vy;
  }

  reignIn() {
    const lowX = -(this.image.width / 2);
    const lowY = -(this.image.height / 2);
    const highX = this.renderer.width() + (this.image.width / 2);
    const highY = this.renderer.height() + (this.image.height / 2);

    if (this.x < lowX) { this.x = lowX; }
    if (this.y < lowY) { this.y = lowY; }
    if (this.x > highX) { this.x = highX; }
    if (this.y > highY) { this.y = highY; }
  }
}


/** Orchestrates and renders particles */
class ParticleRenderer {
  /**
   * Create a new particle renderer.
   * @param {CanvasRenderingContext2D} ctx - the rendering context of the canvas to draw on
   * @param {number} particleCount - the number of particles to maintain in the simulation
   * @param {number} fps - the number of frames per second at which the simulation should run
   * @param {number} maxSpeed - the maximum velocity in either direction that a particle may have
   * @param {function} postRender - a function to run after each frame is drawn
   */
  constructor(ctx, particleCount, fps, maxSpeed, postRender) {
    this.ctx = ctx;
    this.particleCount = particleCount;
    this.fps = fps;
    this.maxSpeed = maxSpeed || 4;
    this.postRender = postRender || (() => {});

    this.particles = new Array(this.particleCount).fill(0).map(() => new Particle(
      this,
      // X and Y position
      random(0, this.width()),
      random(0, this.height()),
      // X and Y velocity. Either positive or negative with a minimum speed of 0.5, max of maxSpeed
      randchoice([random(-this.maxSpeed, -0.5), random(0.5, this.maxSpeed)]),
      randchoice([random(-this.maxSpeed, -0.5), random(0.5, this.maxSpeed)]),
      // Rotational velocity
      random(-0.5, 0.5),
      // Random choice of the mist particle textures as an image
      randchoice(textures),
    ));
  }

  /**
   * Draw the particles on the canvas
   */
  draw() {
    this.ctx.globalCompositeOperation = 'source-over';

    if (texturesLoaded) {
      this.ctx.clearRect(0, 0, this.width(), this.height());
      this.ctx.globalAlpha = 0.8;
      this.particles.forEach((p) => {
        const width = window.innerWidth / 3;
        const height = width;
        const rotation = p.rot * (Math.PI / 180);

        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(rotation);

        this.ctx.drawImage(
          p.image,
          -(width / 2), -(height / 2),
          width, height,
        );

        this.ctx.rotate(-rotation);
        this.ctx.translate(-p.x, -p.y);
      });
    }

    this.ctx.globalAlpha = 1;

    this.postRender(this);
  }

  /**
   * Advance the simulation by one step
   */
  step() {
    this.particles.forEach(particle => particle.step());
  }

  /**
   * Begin a run loop
   */
  start() {
    this.step();
    requestAnimationFrame(() => this.draw());
    this.timeoutID = setTimeout(() => this.start(), 1000 / this.fps);
  }

  /**
   * Stop the run loop
   */
  stop() {
    clearTimeout(this.timeoutID);
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

export { texturePaths, Particle, ParticleRenderer };
