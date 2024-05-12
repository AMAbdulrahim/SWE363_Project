
    function validateForm() {
        var inputs = document.querySelectorAll('input, textarea');
        var isValid = true;

        inputs.forEach(function(input) {
            if (input.value.trim() === '') {
                isValid = false;
                input.style.border = '1px solid red';
            } else {
                input.style.border = '';
            }
        });

        if (!isValid) {
            alert('Please fill in all fields.');
            return false;
        }
        return true;
    }


    function setMinimumDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("date").setAttribute("min", today);
    }

    
    document.addEventListener("DOMContentLoaded", function () {
        setMinimumDate();
    });