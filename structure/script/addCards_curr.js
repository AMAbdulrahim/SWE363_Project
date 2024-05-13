document.addEventListener('DOMContentLoaded', function() {
    var userDataJSON = sessionStorage.getItem('userData');
    if (userDataJSON) {
        var userData = JSON.parse(userDataJSON);                        
        var userId = userData._id;
    }

    if (!userId) {
        alert('User not authenticated');
        return;
    }

    const logoutLink = document.getElementById('logout');

        logoutLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior

            // Clear session storage
            sessionStorage.clear();

            // Redirect to the homepage
            window.location.href = './index.html';
        });
    
    fetch(`http://localhost:8000/users/${userId}/events`)
        .then(response => response.json())
        .then(events => {
            const currentDate = new Date();
            events.forEach(event => {
                const eventDate = new Date(event.eventDate);
                let cardHTML;
                if (eventDate < currentDate) {
                    // Previous event template
                    cardHTML = `
                        <div class="card">
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
                            </div>
                            <div class="review-card">
                                <button id="reviewBtn" onclick="redirectToReview()">Review</button>
                            </div>
                        </div>
                    `;
                } else {
                    // Current event template
                    cardHTML = `
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
                            <h5 id="event-date">Date: ${new Date(event.eventDate).toLocaleDateString()}</h5>
                            <h5 id="event-time">Time: ${event.eventTime}</h5>
                        </div>
                        <div class="card-button" onclick="event.stopPropagation();">
                            <button class="add-button" onclick="deleteEvent('${event._id}', this)">
                                <img src="/images/delete_button.svg" alt="Delete">
                            </button>
                            <button class="add-button">
                                <a href="editCreateEvent.html?eventId=${event._id}"><img src="/images/edit_button.svg" alt="Edit"></a>
                            </button>
                        </div>
                    </div>
                </div>
                    `;
                }
                const container = eventDate < currentDate ? document.querySelector('.previous-event-section') : document.querySelector('.current-event-section');
                container.innerHTML += cardHTML;
            });
        })
        .catch(error => {
            console.error('Failed to fetch events:', error);
        });
});


function navigateToEvent(eventId) {
    window.location.href = `event.html?eventId=${eventId}`;
}

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

function redirectToReview() {
    window.location.href = "review.html"; 
}


