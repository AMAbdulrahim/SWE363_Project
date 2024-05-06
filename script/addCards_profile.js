// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function () {
    // Get the .profile-event-info element
    var profileEventInfo = document.querySelector('.card-holder');
    
    // Define the number of times you want to create .card elements
    var numberOfCards = 10;
    
    // Loop through and create .card elements
    for (var i = 0; i < numberOfCards; i++) {
        // Create a new .card div element
        var card = document.createElement('div');
        card.classList.add('card');
        
        // Add content to the .card element
        card.innerHTML = `
            <div class="img-card">
                <img id="event-img" src="/images/card-img-placeholder.png" alt="Event Image">
            </div>
            <div class="des">
                <h1 id="event-name-card">MAIN</h1>
                <h5 id="event-des">Description about the event Description about the event Description about the event Description about the event</h5>
            </div>
            <div class="card-des">
                        <div>
                            <h5 id="event-date">31/12/2024</h5>
                            <h5 id="event-time">3:30 pm</h5>
                        </div>
                        <div class="review-card">
                            <button id="reviewBtn">
                                review
                            </button>
                        </div>


                    </div>

        `;
        
        // Append the newly created .card element to the .profile-event-info section
        profileEventInfo.appendChild(card);
    }
});
