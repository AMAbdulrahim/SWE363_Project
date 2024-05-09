document.addEventListener('DOMContentLoaded', function () {
    var cardsSection = document.getElementById('cardsSectionV');

    // Fetch events from the server
    fetch('http://localhost:8000/events')
        .then(response => response.json())
        .then(events => {
            console.log('Events retrieved from the server:', events);
            events.forEach(event => {
                var cardDiv = document.createElement('div');
                cardDiv.className = 'card';
                cardDiv.innerHTML = `
                    <div class="img-card">
                        <img id="event-img" src="/images/card-img-placeholder.png" alt="">
                    </div>
                    <div class="title-card">
                        <h1 id="event-name-card">${event.eventName}</h1>
                    </div>
                    <div class="des-card">
                        <div class="des">
                            <h5 id="event-des">${event.eventDes}</h5>
                            <h5 id="event-date">Date: ${event.eventDate}</h5>
                            <h5 id="event-time">Time: ${event.eventTime}</h5>
                        </div>
                        <div class="card-button">
                            <button class="add-button">
                                <a href="event.html"><img  src="/images/add_button.svg" alt=""></a>
                            </button>
                        </div>
                    </div>`;
                cardsSection.appendChild(cardDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
});
