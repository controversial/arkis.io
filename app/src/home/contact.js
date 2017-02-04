document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formSubmitButton = document.getElementById('contact-form-submit');
  formSubmitButton.addEventListener('click', () => {
    fetch('https://arkisio.now.sh/contact', {
      method: 'POST',
      body: new FormData(contactForm),
    }).then(response => response.text()).then((body) => {
      if (body === 'true') {
        contactForm.innerHTML = 'Success :D';
      } else {
        contactForm.innerHTML = 'Failure :/';
      }
    });
  });
});
