function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var errorMessage = document.getElementById('error-message');

  // Basic validation (you can replace this with more secure authentication)
  if (username === 'user' && password === 'pass') {
    errorMessage.textContent = '';
    alert('Login successful!');
  } else {
    errorMessage.textContent = 'Invalid username or password';
  }
}
