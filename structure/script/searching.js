document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const eventCards = document.querySelectorAll('.card');

    searchButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission
        
        const searchTerm = searchInput.value.trim().toLowerCase();

        eventCards.forEach(function (card) {
            const eventName = card.querySelector('#event-name-card').textContent.trim().toLowerCase();
            
            if (eventName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
