document.addEventListener('DOMContentLoaded', function () {
    var cardsSection = document.getElementById('cardsSectionV');
    var userDataJSON = sessionStorage.getItem('userData');
    var completedEventsSpan = document.getElementById('completedHours'); 


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
            completedEventsSpan.textContent = events.length
            
            events.forEach(event => {
                var profileEventInfo = document.querySelector('.card-holder');
                var card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                <div class="img-card">
                    <img id="event-img" src="${event.eventImage || '/images/card-img-placeholder.png'}" alt="Event Image">
                </div>
                <div class="des">
                    <h1 id="event-name-card">${event.eventName}</h1>
                    <h5 id="event-des">${event.eventDes}</h5>
                </div>
                <div class="card-des">
                            <div>
                                <h5 id="event-date">Date: ${new Date(event.eventDate).toLocaleDateString()}</h5>
                                <h5 id="event-time">Time: ${event.eventTime}</h5>
                            </div>
                            <div class="review-card">
                                <button id="reviewBtn" onclick="redirectToReview()">Review</button>
                            </div>
                        </div>
    
            `;
                profileEventInfo.appendChild(card);
                // cardsSection.appendChild(cardDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching volunteered events:', error);
        });
});



