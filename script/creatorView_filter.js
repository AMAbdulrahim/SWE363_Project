document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const currentEvents = document.querySelectorAll(".current-event-section .card");
    const previousEvents = document.querySelectorAll(".previous-event-section .card");
    const selectFilter = document.getElementById("select_filter");
    const filterButton = document.getElementById("search_button_creator");

    // Function to filter events based on search input and selected option
    function filterEvents() {
        const searchText = searchInput.value.toLowerCase();
        const selectedOption = selectFilter.value;
        
        if (selectedOption === "currSelect") {
            filterEventCards(currentEvents, searchText);
        } else if (selectedOption === "prevSelect") {
            filterEventCards(previousEvents, searchText);
        } else {
            // Reset the search if no valid option is selected
            currentEvents.forEach(card => card.style.display = "");
            previousEvents.forEach(card => card.style.display = "");
        }
    }

    // Function to filter event cards based on search text
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

    // Event listener for search input
    searchInput.addEventListener("input", filterEvents);

    // Event listener for select filter
    selectFilter.addEventListener("change", filterEvents);

    // Event listener for button click
    filterButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        filterEvents(); // Call the filter function when the button is clicked
    });
});
