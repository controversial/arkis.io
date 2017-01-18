// Top bar changes from white to white with scroll, as the background changes

function adjustTopBar(scroll) {
  const topBar = document.getElementsByClassName('top-bar')[0];

  // Scroll distance at which everything will switch from black to white
  const threshold = window.innerWidth > window.innerHeight
                        ? window.innerHeight * 1.5
                        : window.innerHeight;

  // Background color gradually changes until threshold
  const gray = Math.floor(255 - (Math.min(scroll / threshold, 1) * 255));
  topBar.style.backgroundColor = `rgba(${gray}, ${gray}, ${gray}, .1)`;

  // Text color changes suddenly at threshold
  if (scroll > threshold) { // Text color
    topBar.style.color = 'black';
  } else {
    topBar.style.color = 'white';
  }
}


// Main scroll handler


function scrollHandler() {
  const scroll = window.scrollY;
  adjustTopBar(scroll);
}

window.addEventListener('scroll', scrollHandler);
document.addEventListener('DOMContentLoaded', scrollHandler);
