const loginFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(password);

    if (username && password) {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/schedule');
        } else {
            alert('Failed to log in.');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username  && password) {
        const response = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/schedule');
        } else {
            const responseData = await response.json();
      if (response.status === 400) {
        const errorMessage = responseData.message;
        displayPasswordError(errorMessage); // Display the password length error message in the modal
      } else {
        displayPasswordError('Password too short. Must be 8 characters or longer');
      }
    }
}};

const displayPasswordError = (errorMessage) => {
    const passwordTooShortMessage = document.querySelector('#passwordTooShortMessage');
    passwordTooShortMessage.textContent = errorMessage;
  
    const modal = document.getElementById('passwordTooShortModal');



// Function to display the modal
// const displayPasswordError = (errorMessage) => {
//   const passwordTooShortMessage = document.querySelector('#passwordTooShortMessage');
//   passwordTooShortMessage.textContent = errorMessage;

  // Show the modal
  modal.style.display = 'block';
};

const modal = document.getElementById('passwordTooShortModal');
// Function to close the modal
const closeModal = () => {
  modal.style.display = 'none';
};

// Get the close button inside the modal
const closeButton = document.querySelector('.close');
const closeBtn = document.querySelector('.close-button');

// Add event listener to close button in the modal
closeButton.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);

// Add event listener to modal overlay to close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === closeButton) {
    closeModal();
  }
});

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
