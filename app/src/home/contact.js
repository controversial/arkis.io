document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formSubmitButton = document.getElementById('contact-form-submit');
  formSubmitButton.addEventListener('click', () => {
    fetch(contactForm.getAttribute('action'), {
      method: contactForm.getAttribute('method'),
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
