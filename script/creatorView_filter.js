document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const currentEvents = document.querySelectorAll(".current-event-section .card");
    const previousEvents = document.querySelectorAll(".previous-event-section .card");
    const selectFilter = document.getElementById("select_filter");
    const filterButton = document.getElementById("search_button_creator");

    function filterEvents() {
        const searchText = searchInput.value.toLowerCase();
        const selectedOption = selectFilter.value;
        
        if (selectedOption === "currSelect") {
            filterEventCards(currentEvents, searchText);
        } else if (selectedOption === "prevSelect") {
            filterEventCards(previousEvents, searchText);
        } else {
            currentEvents.forEach(card => card.style.display = "");
            previousEvents.forEach(card => card.style.display = "");
        }
    }

    function filterEventCards(events, searchText) {
        events.forEach(card => {
            const eventName = card.querySelector(".title-card h1").textContent.toLowerCase();
            if (eventName.includes(searchText)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", filterEvents);

    selectFilter.addEventListener("change", filterEvents);

    filterButton.addEventListener("click", function(event) {
        event.preventDefault(); 
        filterEvents(); 
    });
});
