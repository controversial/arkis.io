// Scroll effects for the page


// Top bar text changes from white to black after scrolling a certain amount

function adjustTopBar(scroll) {
  const topBar = document.getElementsByClassName('top-bar')[0];

  // Scroll distance at which everything will switch from black to white
  const threshold = window.innerWidth > window.innerHeight
                        ? window.innerHeight * 1.5
                        : window.innerHeight * 0.95;

  // Text color changes suddenly at threshold
  if (scroll > threshold) {
    topBar.style.color = 'black';
  } else {
    topBar.style.color = 'white';
  }
}


// Mist moves around to look like actual mist

function adjustMist(scroll) {
  const secondaryMist = document.querySelector('img.secondary');
  const tertiaryMist = document.querySelector('img.tertiary');

  const progress = scroll / (window.innerHeight * 1.5);

  secondaryMist.style.transform = `translateX(${20 - (75 * progress)}%)`;
  tertiaryMist.style.transform = `translateX(${-20 + (75 * progress)}%)`;
}

// Main scroll handler


function scrollHandler() {
  const scroll = window.scrollY;
  adjustTopBar(scroll);
  adjustMist(scroll);
}

window.addEventListener('scroll', scrollHandler);
document.addEventListener('DOMContentLoaded', scrollHandler);
