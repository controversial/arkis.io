document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.top-bar button.ion-md-menu');
  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('open');
  });
});
