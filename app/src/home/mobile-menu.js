require('./mobile-menu.sass');

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.top-bar button.ion-md-menu');
  const menu = document.getElementById('mobile-menu');
  const topBar = document.getElementsByClassName('top-bar')[0];
  const menuLinks = menu.getElementsByTagName('a');

  function openMenu() {
    menu.style.display = 'block';
    menuButton.classList.add('open');
    menu.classList.add('open');
    topBar.classList.add('mobile-menu-open');

    for (let i = 0; i < menuLinks.length; i += 1) {
      // Use staggered delay for fading in menu links while opening
      setTimeout(() => { menuLinks[i].classList.add('visible'); }, 250 * i);
    }
  }

  function closeMenu() {
    menuButton.classList.remove('open');
    menu.classList.remove('open');
    topBar.classList.remove('mobile-menu-open');
    setTimeout(() => { menu.style.display = 'none'; }, 500);

    for (let i = 0; i < menuLinks.length; i += 1) {
      menuLinks[i].classList.remove('visible');
    }
  }

  function toggleMenu() {
    if (menu.classList.contains('open')) closeMenu();
    else openMenu();
  }

  menuButton.addEventListener('click', toggleMenu);
});
