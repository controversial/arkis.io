function submit() {
  // The <form> element
  const contactForm = document.forms['contact-form'];

  // Read URL and HTTP method from the attributes on the <form> element
  const submitURL = contactForm.getAttribute('action');
  const submitMethod = contactForm.getAttribute('method');

  // Read data from the form for easy POSTing
  const data = new FormData(contactForm);

  // Perform a POST request manually instead of using a submit button. This way, the submission
  // can happen in the background, and the user does not have to be redirected.
  fetch(submitURL, { method: submitMethod, body: data })
    .then(response => response.text())
    .then((body) => {
      if (body === 'true') { // Email sent successfully
        contactForm.innerHTML = 'Success :D';
      } else { // Email failed to send
        contactForm.innerHTML = 'Failure :/';
      }
    });
}

function validate(input) {
  // Returns true if `value` is empty or contains only whitespace
  function isEmpty(value) {
    return value.trim().length === 0;
  }
  // Returns true if `value` roughly matches the format something@something.something
  function isEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
  }

  if (input.getAttribute('type') === 'text') return !isEmpty(input.value);
  else if (input.getAttribute('type') === 'email') return isEmail(input.value);
}

document.addEventListener('DOMContentLoaded', () => {
  // The button in the <form> element
  const formSubmitButton = document.getElementById('contact-form-submit');
  formSubmitButton.addEventListener('click', submit);
});
