document.addEventListener("DOMContentLoaded", function() {
    var icon = document.getElementById("icon");
    var logo = document.getElementById("logoimg");

    // Function to toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
            icon.src = "/images/sun.png";
            logo.src = "/images/logo_white.png";
        } else {
            icon.src = "/images/moon.png";
            logo.src = "/images/logo.png";
        }
        // Save the current mode preference to localStorage
        localStorage.setItem('darkMode', document.body.classList.contains('dark-theme'));
    }

    // Event listener for dark mode toggle
    icon.onclick = toggleDarkMode;

    // Check if dark mode preference is saved in localStorage and apply it
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-theme');
        icon.src = "/images/sun.png";
        logo.src = "/images/logo_white.png";
    }
});
