   // Wait for the DOM content to be loaded
   document.addEventListener('DOMContentLoaded', function() {
    // Select the #cardsSection element
    var cardsSection = document.getElementById('cardsSectionV');
    
    // Loop to create and add #cardID five times
    for (var i = 0; i < 10; i++) {
        // Create a new div element for the card
        var cardDiv = document.createElement('div');
        cardDiv.className = 'card'; // Set the class name
        
        // HTML content for the card
        cardDiv.innerHTML = `

        <div class="img-card">
            <img id="event-img" src="/images/card-img-placeholder.png" alt="">

        </div>

        <div class="title-card">
            <h1 id="event-name-card">MAIN</h1>

        </div>

        <div class="des-card">
           <div class="des">
                <h5 id="event-des">Description about the event</h5>
                <h5 id="event-date">Date: 31/12/2024</h5>
                <h5 id="event-time">Time: 3:30 pm</h5>

            </div>
            <div class="card-button">
            <button class="add-button">
                <a href="event.html"><img  src="/images/add_button.svg" alt=""></a>
            </button>
            </div>
        </div>
           
        `;
        
        // Append the card to the cardsSection
        cardsSection.appendChild(cardDiv);
    }
});