document.addEventListener("DOMContentLoaded", function() {
    // Your JavaScript code here
    var icon = document.getElementById("icon");
    var logo = document.getElementById("logoimg");
    icon.onclick = function() {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
            icon.src = "/images/sun.png";
            logo.src = "/images/logo_white.png"
        } else {
            icon.src = "/images/moon.png";
            logo.src = "/images/logo.png"
            
        }
    };
});
