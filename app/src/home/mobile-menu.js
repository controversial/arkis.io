document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('button.ion-md-menu');
  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('open');
  });
});
