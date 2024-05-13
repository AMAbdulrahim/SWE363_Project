document.addEventListener('DOMContentLoaded', function () {
    var cardsSection = document.getElementById('cardsSectionV');

    //---->
    var searchForm = document.getElementById('search-form');
    var searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting traditionally
        filterEvents(searchInput.value.trim().toLowerCase()); // Filter events based on input
    });
    function filterEvents(searchTerm) {
        fetch('http://localhost:8000/events')
            .then(response => response.json())
            .then(events => {
                cardsSection.innerHTML = ''; // Clear the current events
                const currentDate = new Date(); // Get the current date and time

                events.forEach(event => {
                    const eventDate = new Date(event.eventDate);
                    const eventNameLower = event.eventName.toLowerCase();

                    // Check if the event date is in the future and the name matches the search term
                    if (eventDate > currentDate && eventNameLower.includes(searchTerm)) {
                        var cardDiv = document.createElement('div');
                        cardDiv.className = 'card';
                        cardDiv.innerHTML = `
                            <div class="img-card">
                                <img id="event-img" src="${event.eventImage || '/images/card-img-placeholder.png'}" alt="Event Image">
                            </div>
                            <div class="title-card">
                                <h1 id="event-name-card">${event.eventName}</h1>
                            </div>
                            <div class="des-card">
                                <div class="des">
                                    <h5 id="event-des">${event.eventDes}</h5>
                                    <h5 id="event-date">Date: ${eventDate.toLocaleDateString()}</h5>
                                    <h5 id="event-time">Time: ${event.eventTime}</h5>
                                </div>
                                <div class="card-button">
                                    <button class="add-button">
                                        <a href="event.html?eventId=${event._id}"><img src="/images/add_button.svg" alt="View Details"></a>
                                    </button>
                                </div>
                            </div>`;
                        cardsSection.appendChild(cardDiv);
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }

    //----->

    // Initial load of events
    filterEvents(''); // Load all events initially

    const logoutLink = document.getElementById('logout');
    logoutLink.addEventListener('click', function(event) {
        event.preventDefault(); 

        // Clear session storage
        sessionStorage.clear();

        // Redirect to the homepage
        window.location.href = './index.html';
    });


    // Fetch events from the server
    fetch('http://localhost:8000/events')
        .then(response => response.json())
        .then(events => {
            console.log('Events retrieved from the server:', events);
            const currentDate = new Date(); // Get the current date and time

            events.forEach(event => {
                const eventDate = new Date(event.eventDate);

                // Check if the event date is in the future
                if (eventDate > currentDate) {
                    var cardDiv = document.createElement('div');
                    cardDiv.className = 'card';
                    cardDiv.innerHTML = `
                        <div class="img-card">
                            <img id="event-img" src="/images/card-img-placeholder.png" alt="Event Image">
                        </div>
                        <div class="title-card">
                            <h1 id="event-name-card">${event.eventName}</h1>
                        </div>
                        <div class="des-card">
                            <div class="des">
                                <h5 id="event-des">${event.eventDes}</h5>
                                <h5 id="event-date">Date: ${eventDate.toLocaleDateString()}</h5>
                                <h5 id="event-time">Time: ${event.eventTime}</h5>
                            </div>
                            <div class="card-button">
                                <button class="add-button">
                                    <a href="event.html?eventId=${event._id}"><img src="/images/add_button.svg" alt="View Details"></a>
                                </button>
                            </div>
                        </div>`;
                    cardsSection.appendChild(cardDiv);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
});