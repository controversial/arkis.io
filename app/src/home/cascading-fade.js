const contentMain = document.getElementById('content-main');
const fadeElements = contentMain.querySelectorAll('[data-fade]');

module.exports = function cascadeFadeIn() {
  contentMain.className = 'visible';

  for (let i = 0; i < fadeElements.length; i += 1) {
    const elem = fadeElements[i];
    setTimeout(() => {
      elem.style.opacity = 1;
    }, elem.getAttribute('data-fade') * 1000);
  }
};
