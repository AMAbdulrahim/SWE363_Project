document.addEventListener('DOMContentLoaded', function() {
    
    //get the user data from the local storage 
    var userDataJSON = sessionStorage.getItem('userData');
    if (userDataJSON) {
        var userData = JSON.parse(userDataJSON);                        
        var userId = userData._id;
    }
    //check if the user exixst if not return 
    if (!userId) {
        alert('User not authenticated');
        return;
    }

    //logout 
    const logoutLink = document.getElementById('logout');
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            sessionStorage.clear();
            window.location.href = './index.html';
        });

    //search bar 
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        fetchAndDisplayEvents(searchInput.value.trim().toLowerCase());
    });

    function fetchAndDisplayEvents(searchTerm) {
        fetch(`http://localhost:8000/users/${userId}/events`)
            .then(response => response.json())
            .then(events => {
                displayEvents(events, searchTerm);
            })
            .catch(error => {
                console.error('Failed to fetch events:', error);
            });
    }

    function displayEvents(events, filter) {
        const currentDate = new Date();
        const previousEventsSection = document.querySelector('.previous-event-section');
        const currentEventsSection = document.querySelector('.current-event-section');
    
        // Clear previous and current sections but preserve the 'Create Event' card
        previousEventsSection.innerHTML = ''; // Clear previous events
        currentEventsSection.innerHTML = ''; // Clear current events
    
        // Re-append the 'Create Event' card to current section
        const createEventCardHTML = `
            <div class="card" id="create-event-card">
                <div class="card-button">
                    <button class="add-button">
                        <a href="/editCreateEvent.html"><img src="/images/add_button.svg" /></a>
                    </button>
                </div>
                <div class="title-card">
                    <h1 id="event-name-card">CREATE AN EVENT</h1>
                </div>
            </div>
        `;
        currentEventsSection.innerHTML = createEventCardHTML; // Add 'Create Event' card first
    
        events.forEach(event => {
            const eventDate = new Date(event.eventDate);
            let targetSection = eventDate < currentDate ? previousEventsSection : currentEventsSection;
            let isPrevious = eventDate < currentDate;
    
            // Apply search filter
            if (event.eventName.toLowerCase().includes(filter)) {
                let cardHTML = `
                    <div class="card" onclick="navigateToEvent('${event._id}')">
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
                            ${isPrevious ? `
                            <div class="review-card">
                                <button id="reviewBtn" onclick="redirectToReview()">Review</button>
                            </div>` : `
                            <div class="card-button" onclick="event.stopPropagation();">
                                <button class="add-button" onclick="deleteEvent('${event._id}', this)">
                                    <img src="/images/delete_button.svg" alt="Delete">
                                </button>
                                <button class="add-button">
                                    <a href="editCreateEvent.html?eventId=${event._id}"><img src="/images/edit_button.svg" alt="Edit"></a>
                                </button>
                            </div>`}
                        </div>
                    </div>
                `;
                targetSection.innerHTML += cardHTML;
            }
        });
    }
    

    // Initially display all events
    fetchAndDisplayEvents('');
});

function navigateToEvent(eventId) {
    window.location.href = `event.html?eventId=${eventId}`;
}

function redirectToReview() {
    window.location.href = "review.html"; 
}

//delte the event from the events 
function deleteEvent(eventId, buttonElement) {
    const userDataJSON = sessionStorage.getItem('userData');
    if (!userDataJSON) {
        alert('User not authenticated');
        return;
    }
    const userData = JSON.parse(userDataJSON);
    const userId = userData._id;

    fetch(`http://localhost:8000/events/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to delete the event');
        return response.json();
    })
    .then(data => {
        alert(data.message);
        // Remove the card element from the DOM
        buttonElement.closest('.card').remove();
    })
    .catch(error => {
        console.error('Error deleting event:', error);
        alert('Failed to delete event: ' + error.message);
    });
}

