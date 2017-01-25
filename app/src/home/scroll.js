// Scroll effects for the page

// Scroll distance at which the user has scrolled into the white section
const threshold1 = window.innerWidth > window.innerHeight
                      ? window.innerHeight * 1.25
                      : window.innerHeight * 0.95;


// Top bar text changes from white to black after scrolling a certain amount
function adjustTopBar(scroll) {
  const topBar = document.getElementsByClassName('top-bar')[0];

  // Text color changes suddenly at threshold
  if (scroll > threshold1) {
    topBar.classList.add('black');
  } else {
    topBar.classList.remove('black');
  }
}


function headlineParallax(scroll) {
  requestAnimationFrame(() => {
    const headline = document.getElementsByClassName('headline')[0];
    headline.style.transform = `translateY(calc( -50% - ${scroll / 50}vh ))`;
  });
}


function adjustAnimationPlayState(scroll) {
  if (window.mistSim) {
    if (scroll > threshold1) {
      window.mistSim.stop();
    } else if (!window.mistSim.running) {
      window.mistSim.start();
    }
  }
}

// Main scroll handler


function scrollHandler() {
  const scroll = window.scrollY;
  adjustTopBar(scroll);
  headlineParallax(scroll);
  adjustAnimationPlayState(scroll);
}

window.addEventListener('scroll', scrollHandler);
document.addEventListener('DOMContentLoaded', scrollHandler);
