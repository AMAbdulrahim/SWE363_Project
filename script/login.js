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
            return response.json(); // Parse response body as JSON
        } else {
            throw new Error('Login failed');
        }
    })
    .then(data => {
        // Check user type and redirect accordingly
        if (data && data.user && data.user.userType === 'volunteer') {
            console.log('Volunteer logged in successfully');
            window.location.href = './profile.html'; // Redirect to volunteer profile page
        } else if (data && data.user && data.user.userType === 'creator') {
            console.log('Creator logged in successfully');
            window.location.href = './creator_viewAvailableEvents.html'; // Redirect to creator view available events page
        } else {
            throw new Error('Invalid user type');
        }
    })
    .catch(error => {
        console.error('Error logging in:', error);
        alert('Invalid email or password. Please try again.'); // Display error message
    });

    return false; // Prevent the form from submitting normally
}
