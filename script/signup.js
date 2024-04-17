

function validateForm() {
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;
    var city = document.getElementById('City').value;
    var name = document.getElementById('Name').value;
    var emailRegex = /^[^\d][\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    var passwordRegex = /^(?=.*[a-zA-Z])(?=.*\W).{6,20}$/;
    var nameCityRegex = /^[a-zA-Z\s]+$/;

    if (email === '' && password === '' && name === '' && city === '') {
        alert('Please fill all fields'); 
        return false;
    } else if (email === '' || email === null) {
        alert('Please fill email field');
        return false;
    }
    else if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return false;
    }
    else if (name === '' || name === null) {
        alert('Please fill name field');
        return false;
    } 
    else if (!nameCityRegex.test(name)) {
        alert('Name should not contain any numbers or symbol');
        return false;
    } 
    else if (city === '' || city === null) {
        alert('Please fill city field');
        return false;
    } 

    else if (!nameCityRegex.test(city)) {
        alert('City should not contain any numbers or symbol');
        return false;
    } 
     else if (password === '' || password === null) {
        alert('Please fill password field');
        return false;
    }

    else if (password.length < 6 || password.length > 20) {
    alert('Password must be between 6 and 20 characters');
    return false;
} 
else if (!passwordRegex.test(password)) {
    alert('Password must contain at least one letter and one symbol');
    return false;
} 

else if (password.toLowerCase() === "password") {
    alert('Please choose a different password');
    return false;
   }  
else {
        window.location.href = "signDone.html";
        return false; 
    }
}

