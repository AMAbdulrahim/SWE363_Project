document.addEventListener('DOMContentLoaded', function() {
            // Retrieve user data from sessionStorage
// Retrieve user data from sessionStorage
var userDataJSON = sessionStorage.getItem('userData');

// Check if user data is available
if (userDataJSON) {
    var userData = JSON.parse(userDataJSON);
    
    // Update profile name
    var profileNameElement = document.getElementById('profileName');
    var profileName2Element = document.getElementById('profileName2');
    
    if (profileNameElement) {
        // Split the name at the space character and take the first part
        var firstName = userData.name.split(' ')[0];
        profileNameElement.textContent = firstName; // Assuming user's name is stored in the 'name' field
    }
    
    if (profileName2Element) {
        profileName2Element.textContent = userData.name; // Assuming user's name is stored in the 'name' field
    }
    
    // Update profile email
    var profileEmailElement = document.getElementById('profileEmail');
    if (profileEmailElement) {
        profileEmailElement.textContent = userData.email; // Assuming user's email is stored in the 'email' field
    }
}


});
