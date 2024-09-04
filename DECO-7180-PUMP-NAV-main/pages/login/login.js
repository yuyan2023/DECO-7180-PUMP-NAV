function checkLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // For demonstration, using fixed username and password
    if(username === 'admin' && password === 'admin') {
      alert('Login successful!');
    } else {
      alert('Invalid username or password');
    }
    
    return false; // Prevent form from submitting for demo purposes
  }