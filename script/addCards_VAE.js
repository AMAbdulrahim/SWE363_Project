const dummyData = [
    {
      eventName: "Clean-up Drive",
      eventDes: "Help clean the local park and make it a better place for everyone",
      eventDate: "20/05/2024",
      eventTime: "09:00"
    },
    {
      eventName: "Food Drive",
      eventDes: "Collect food donations for the local homeless shelter",
      eventDate: "25/05/2024",
      eventTime: "11:30"
    },
    {
      eventName: "Tutoring Session",
      eventDes: "Volunteer to tutor underprivileged children in math and science",
      eventDate: "02/06/2024",
      eventTime: "15:00"
    },
    {
      eventName: "Animal Shelter Volunteer",
      eventDes: "Spend time with shelter animals and help with feeding and cleaning",
      eventDate: "10/06/2024",
      eventTime: "14:00"
    },
    {
      eventName: "Community Garden Planting",
      eventDes: "Plant flowers and vegetables in the community garden",
      eventDate: "18/06/2024",
      eventTime: "10:00"
    },
    {
      eventName: "Elderly Care Visit",
      eventDes: "Visit a local nursing home and spend time with elderly residents",
      eventDate: "22/06/2024",
      eventTime: "16:00"
    },
    {
      eventName: "Beach Clean-up",
      eventDes: "Help clean up trash and debris from the beach",
      eventDate: "30/06/2024",
      eventTime: "08:30"
    },
    {
      eventName: "Blood Donation Drive",
      eventDes: "Donate blood and save lives at the local blood bank",
      eventDate: "05/07/2024",
      eventTime: "13:00"
    },
    {
      eventName: "Library Book Sorting",
      eventDes: "Sort and organize books at the community library",
      eventDate: "12/07/2024",
      eventTime: "10:30"
    },
    {
      eventName: "Park Maintenance",
      eventDes: "Help maintain and beautify the local park by planting trees and flowers",
      eventDate: "20/07/2024",
      eventTime: "09:00"
    },
    {
      eventName: "Soup Kitchen Volunteer",
      eventDes: "Assist in serving meals to the homeless at the local soup kitchen",
      eventDate: "25/07/2024",
      eventTime: "11:00"
    },
    {
      eventName: "Recycling Drive",
      eventDes: "Collect recyclable materials from the community and help with sorting",
      eventDate: "01/08/2024",
      eventTime: "14:00"
    },
    {
      eventName: "Community Center Renovation",
      eventDes: "Help renovate and paint the community center",
      eventDate: "10/08/2024",
      eventTime: "09:30"
    },
    {
      eventName: "Street Cleanup",
      eventDes: "Clean up litter and debris from the streets of the neighborhood",
      eventDate: "18/08/2024",
      eventTime: "10:00"
    },
    {
      eventName: "Toy Drive",
      eventDes: "Collect toys for underprivileged children in the community",
      eventDate: "24/08/2024",
      eventTime: "13:30"
    },
    {
      eventName: "Community Health Fair",
      eventDes: "Volunteer at a health fair and provide information on wellness",
      eventDate: "02/09/2024",
      eventTime: "11:00"
    },
    {
      eventName: "Gardening Workshop",
      eventDes: "Attend a workshop on gardening techniques and tips",
      eventDate: "09/09/2024",
      eventTime: "15:30"
    },
    {
      eventName: "Habitat for Humanity Build",
      eventDes: "Volunteer to help build homes for families in need",
      eventDate: "15/09/2024",
      eventTime: "08:00"
    },
    {
      eventName: "Community Picnic",
      eventDes: "Join a picnic in the park with games and activities for the whole family",
      eventDate: "22/09/2024",
      eventTime: "12:00"
    },
    {
      eventName: "Environmental Cleanup",
      eventDes: "Participate in cleaning up litter and pollution from the environment",
      eventDate: "30/09/2024",
      eventTime: "09:00"
    }
  ];
  
  console.log(dummyData);
  
   

  
   // Wait for the DOM content to be loaded
   document.addEventListener('DOMContentLoaded', function() {
    // Select the #cardsSection element
    var cardsSection = document.getElementById('cardsSectionV');
    
    // Loop to create and add #cardID five times
    for (var i = 0; i < dummyData.length; i++) {
        // Create a new div element for the card
        var cardDiv = document.createElement('div');
        cardDiv.className = 'card'; // Set the class name
        
        // HTML content for the card
        cardDiv.innerHTML = `

        <div class="img-card">
            <img id="event-img" src="/images/card-img-placeholder.png" alt="">

        </div>

        <div class="title-card">
            <h1 id="event-name-card">${dummyData[i].eventName}</h1>

        </div>

        <div class="des-card">
           <div class="des">
                <h5 id="event-des">${dummyData[i].eventDes}</h5>
                <h5 id="event-date">Date: ${dummyData[i].eventDate}</h5>
                <h5 id="event-time">Time: ${dummyData[i].eventTime}</h5>

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