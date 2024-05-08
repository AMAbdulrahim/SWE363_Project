function validateLogin() {
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;

    if (email === '' || password === '') {
        alert('Please fill in both email and password fields');
        return false;
    }

    var formData = {
        email: email,
        password: password
    };

    fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            console.log('User logged in successfully');
            window.location.href = './profile.html'; // Redirect to dashboard or home page
        } else {
            throw new Error('Login failed');
        }
    })
    .catch(error => {
        console.error('Error logging in:', error);
        alert('Invalid email or password. Please try again.'); // Display error message
    });

    return false; // Prevent the form from submitting normally
}
