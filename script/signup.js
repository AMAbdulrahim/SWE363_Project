function validateForm() {
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;
    var city = document.getElementById('City').value;
    var name = document.getElementById('Name').value;
    var emailRegex = /^[^\d][\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    var passwordRegex = /^(?=.*[a-zA-Z])(?=.*\W).{6,20}$/;
    var nameCityRegex = /^[a-zA-Z\s]+$/;

    if (email === '' || password === '' || name === '' || city === '') {
        alert('Please fill all fields');
        return false;
    } else if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    } else if (!nameCityRegex.test(name)) {
        alert('Name should not contain any numbers or symbols');
        return false;
    } else if (!nameCityRegex.test(city)) {
        alert('City should not contain any numbers or symbols');
        return false;
    } else if (password.length < 6 || password.length > 32) {
        alert('Password must be between 6 and 32 characters');
        return false;
    } else if (!passwordRegex.test(password)) {
        alert('Password must contain at least one letter and one symbol');
        return false;
    } else if (password.toLowerCase() === "password") {
        alert('Please choose a different password');
        return false;
    } else {
        // If form data is valid, make an AJAX request to the server
        var formData = {
            name: name,
            email: email,
            city: city,
            password: password
        };

        // Send the form data to the server using fetch API
        // Send the form data to the server using fetch API
fetch('http://localhost:8000/user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
})
.then(response => {
    if (response.ok) {
        console.log('User data saved successfully');
        window.location.href = "signDone.html"; // Redirect to success page
    } else {
        return response.json(); // Parse response body as JSON
    }
})
.then(data => {
    if (data && data.message === 'Email already exists') {
        alert('The email address you entered already exists.'); // Display specific error message
    } else {
        throw new Error('Error saving user data');
    }
})
.catch(error => {
    console.error('Error saving user data:', error);
    alert('Error occurred while saving user data. Please try again later.'); // Generic error message
});


        return false; // Prevent the form from submitting normally
    }
}
