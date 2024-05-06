document.addEventListener("DOMContentLoaded", function() {
    // Function to generate HTML code for a single card
    function generateCard_prev() {
        return `
        <div   class="card">
        
        <div class="img-card">
            <img id="event-img" src="/images/card-img-placeholder.png" alt="Event Image">

        </div>

        <div class="title-card">
            <h1 id="event-name-card">EVENT NAME</h1>

        </div>

        <div class="des-card">
           <div class="des">
                <h5 id="event-des">Description about the event</h5>
                <h5 id="event-date">Date: 31/12/2024</h5>
                <h5 id="event-time">Time: 3:30 pm</h5>

            </div>
           
        </div>

        <div class="review-card">
                    <button id="reviewBtn">
                        review
                    </button>
        </div>
    </div> 
        `;
    }

    // Function to add 10 cards to a specified section
    function addCardsToSection_prev(sectionClass) {
        const section = document.querySelector(`.${sectionClass}`);
        if (!section) {
            console.error(`Section with class '${sectionClass}' not found.`);
            return;
        }

        for (let i = 0; i < 10; i++) {
            const cardHtml = generateCard_prev();
            section.innerHTML += cardHtml;
        }
    }

    // Add 10 cards to the previous-event-section
    addCardsToSection_prev('previous-event-section');
});






