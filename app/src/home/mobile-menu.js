require('./mobile-menu.sass');

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.top-bar button.ion-md-menu');
  const menu = document.querySelector('.mobile-menu');

  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('open');
    menu.classList.toggle('open');

    const menuLinks = menu.getElementsByTagName('a');
    for (let i = 0; i < menuLinks.length; i += 1) {
      setTimeout(
        () => { menuLinks[i].classList.toggle('visible'); },
        // Use staggered delay when opening, 0 delay when closing
        menu.classList.contains('open') ? 250 * i : 0,
      );
    }
  });
});
