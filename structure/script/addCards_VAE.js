document.addEventListener('DOMContentLoaded', function () {
    var cardsSection = document.getElementById('cardsSectionV');

    const logoutLink = document.getElementById('logout');

    logoutLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior

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

