

const login = async ()=> {
    const email = $('#email').val().trim();
    const password = $('#password').val().trim();

    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          // If successful, redirect the browser to the profile page
          document.location.replace('/');
        } else {
          alert(response.statusText);
        }

      }
}

$('#login').on('click', () => {
    login();
})

const signup = async ()=> {

  const name = $('#username').val().trim();
  const email = $('#email').val().trim();
  const password = $('#password').val().trim();

  if (name && email && password){
      const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          $('.alert').fadeIn();
        }
  }
}

$('#signup').on('click', () => {
  signup();
})