function scrollHandler() {
  console.log(window.scrollY);
}

window.addEventListener('scroll', scrollHandler);
document.addEventListener('DOMContentLoaded', scrollHandler);
