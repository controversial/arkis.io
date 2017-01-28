require('./mobile-menu.sass');

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.top-bar button.ion-md-menu');
  const menu = document.querySelector('.mobile-menu');

  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('open');
    menu.classList.toggle('open');
  });
});
