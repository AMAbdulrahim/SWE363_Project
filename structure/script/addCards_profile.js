document.addEventListener('DOMContentLoaded', function () {
    var cardsSection = document.getElementById('cardsSectionV');
    var userDataJSON = sessionStorage.getItem('userData');
    var completedEventsSpan = document.getElementById('completedHours'); 
    var eventAnchor = document.getElementById('eventsLink')

    if (!userDataJSON) {
        console.error('User not authenticated');
        return;
    }
    var userData = JSON.parse(userDataJSON);
    var userId = userData._id;

        const logoutLink = document.getElementById('logout');
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior

            // Clear session storage
            sessionStorage.clear();

            // Redirect to the homepage
            window.location.href = './index.html';
        });


    //check the user type and then mosify the event page link 
    if(userData.userType ==="creator"){
        eventAnchor.setAttribute('href', '/creator_viewAvailableEvents.html');
    }

    var eventCounter = Array.from({ length: 12 }, () => 0); // Initialize to an array of 12 zeros

    // Fetch events from the server that the user has volunteered for
    fetch(`http://localhost:8000/users/${userId}/events`)
        .then(response => response.json())
        .then(events => {
            console.log('Volunteered events retrieved from the server:', events);
            if (events.length === 0) {
                cardsSection.innerHTML = '<p>No volunteered events found.</p>';
                completedEventsSpan.textContent = '0';
                return;
            }
            
            // Loop through each event to count events for each month
            events.forEach(event => {
                // Extract month from event date and increment the corresponding counter
                var eventDate = new Date(event.eventDate);
                var monthIndex = eventDate.getMonth();
                eventCounter[monthIndex]++;
            });
            sessionStorage.setItem('eventCounter', JSON.stringify(eventCounter));

            // Log the event counts for each month
            console.log('Event counter for each month:', eventCounter);

            //update the user completed hours 
            completedEventsSpan.textContent = events.length
            
            events.forEach(event => {
                var profileEventInfo = document.querySelector('.card-holder');
                var card = document.createElement('div');
                card.classList.add('card');
                var eventDate = new Date(event.eventDate);
                var currentDate = new Date();
                card.innerHTML = `
                    <div class="img-card">
                    <a href="event.html?eventId=${event._id}"><img id="event-img" src="${event.eventImage || '/images/card-img-placeholder.png'}" alt="Event Image"></a>
                    </div>
                    <div class="des">
                        <h1 id="event-name-card">${event.eventName}</h1>
                        <h5 id="event-des">${event.eventDes}</h5>
                    </div>
                    <div class="card-des">
                        <div>
                            <h5 id="event-date">${eventDate.toLocaleDateString()}</h5>
                            <h5 id="event-time">${event.eventTime}</h5>
                        </div>
                    <div class="review-card">
                `;

                // Add the review button only if the event date is in the past
                if (eventDate < currentDate) {
                    if(userData.userType ==="creator"){
                        card.innerHTML += ` <a href="CreatorReview.html?eventId=${event._id}"><button id="reviewBtn">Reviews</button></a>`;
                    }
                    else{
                        card.innerHTML += ` <a href="review.html?eventId=${event._id}"><button id="reviewBtn">Review</button></a>`;
                    }
                }
                card.innerHTML += `</div></div>`;
                profileEventInfo.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching volunteered events:', error);
        });

});



