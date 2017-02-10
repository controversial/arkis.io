require('./mobile-menu.sass');

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.top-bar button.ion-md-menu');
  const menuElem = document.getElementById('mobile-menu');
  const topBar = document.getElementsByClassName('top-bar')[0];
  const menuLinks = menuElem.getElementsByTagName('a');

  window.mobileMenu = {
    open: () => {
      menuElem.style.display = 'block';
      menuButton.classList.add('open');
      menuElem.classList.add('open');
      topBar.classList.add('mobile-menu-open');

      for (let i = 0; i < menuLinks.length; i += 1) {
        // Use staggered delay for fading in menu links while opening
        setTimeout(() => { menuLinks[i].classList.add('visible'); }, 250 * i);
      }
    },

    close: () => {
      menuButton.classList.remove('open');
      menuElem.classList.remove('open');
      topBar.classList.remove('mobile-menu-open');
      setTimeout(() => { menuElem.style.display = 'none'; }, 500);

      for (let i = 0; i < menuLinks.length; i += 1) {
        menuLinks[i].classList.remove('visible');
      }
    },

    toggle: () => {
      if (menuElem.classList.contains('open')) window.mobileMenu.close();
      else window.mobileMenu.open();
    },
  };

  menuButton.addEventListener('click', window.mobileMenu.toggle);
});
