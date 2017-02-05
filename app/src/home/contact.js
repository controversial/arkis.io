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
  return true;
}

function updateValidity(input) {
  const isValid = validate(input);
  if (!isValid) input.classList.add('invalid');
  else input.classList.remove('invalid');
}

function submit() {
  // The <form> element
  const contactForm = document.forms['contact-form'];

  // Run validation on all inputs
  const formInputs = contactForm.getElementsByTagName('input');
  for (let i = 0; i < formInputs.length; i += 1) {
    updateValidity(formInputs[i]);
  }

  // Make sure everything is valid
  if (contactForm.getElementsByClassName('invalid').length === 0) {
    // Display loading
    contactForm.classList.add('loading');
    // Read URL and HTTP method from the attributes on the <form> element
    let submitURL = contactForm.getAttribute('action');
    const submitMethod = contactForm.getAttribute('method');

    // Debugging
    if (window.location.search === '?nopost-true') {
      submitURL = 'https://arkisio.now.sh/contact-dummy-true';
    } else if (window.location.search === '?nopost-false') {
      submitURL = 'https://arkisio.now.sh/contact-dummy-false';
    }

    // Read data from the form for easy POSTing
    const data = new FormData(contactForm);

    // Perform a POST request manually instead of using a submit button. This way, the submission
    // can happen in the background, and the user does not have to be redirected.
    fetch(submitURL, { method: submitMethod, body: data })
      .then(response => response.text())
      .then((body) => {
        contactForm.classList.remove('loading');
        if (body === 'true') { // Email sent successfully
          contactForm.classList.add('succeeded');
        } else { // Email failed to send
          contactForm.classList.add('failed');
        }
      });
  } else {
    const buttonContainer = contactForm.getElementsByClassName('button-container')[0];
    setTimeout(() => buttonContainer.classList.add('shake'), 250);
    setTimeout(() => buttonContainer.classList.remove('shake'), 750);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Submit when the button in the <form> element is clicked
  const formSubmitButton = document.getElementById('contact-form-submit');
  formSubmitButton.addEventListener('click', submit);

  // Validate each input when it's typed in
  const contactForm = document.forms['contact-form'];
  contactForm.addEventListener('input', e => updateValidity(e.target));
});
