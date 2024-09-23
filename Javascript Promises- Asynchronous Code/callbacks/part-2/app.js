// Use jQuery's shorthand for document ready to ensure the DOM is fully loaded before executing the code
$(function() {
  // Define the base URL for the Deck of Cards API
  let baseURL = 'https://deckofcardsapi.com/api/deck';

  // 1. Fetch a single card from a newly shuffled deck
  $.getJSON(`${baseURL}/new/draw/`, function(data) {
    // Destructure the suit and value from the drawn card
    let { suit, value } = data.cards[0];
    // Log the card's value and suit in lowercase to the console
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });

  // 2. Draw two cards from the same deck
  $.getJSON(`${baseURL}/new/draw/`, function(data) {
    // Get the first card and the deck ID from the first draw
    let firstCard = data.cards[0];
    let deckId = data.deck_id;
    
    // Draw a second card from the same deck using the deck ID
    $.getJSON(`${baseURL}/${deckId}/draw/`, function(data) {
      // Get the second card from the second draw
      let secondCard = data.cards[0];
      // Iterate over both cards to log their values and suits
      [firstCard, secondCard].forEach(function(card) {
        console.log(
          `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
      });
    });
  });

  // 3. Set up the card drawing feature with a button
  let deckId = null; // Variable to hold the deck ID
  let $btn = $('button'); // Select the button for drawing cards
  let $cardArea = $('#card-area'); // Select the area where cards will be displayed

  // Shuffle a new deck and store its ID
  $.getJSON(`${baseURL}/new/shuffle/`, function(data) {
    deckId = data.deck_id; // Store the deck ID for future draws
    $btn.show(); // Show the button after the deck is shuffled
  });

  // Event listener for the button click to draw a card
  $btn.on('click', function() {
    // Draw a card from the deck using the stored deck ID
    $.getJSON(`${baseURL}/${deckId}/draw/`, function(data) {
      // Get the image source of the drawn card
      let cardSrc = data.cards[0].image;
      // Generate random values for rotation and position
      let angle = Math.random() * 90 - 45; // Random rotation between -45 and 45 degrees
      let randomX = Math.random() * 40 - 20; // Random X translation between -20 and 20 pixels
      let randomY = Math.random() * 40 - 20; // Random Y translation between -20 and 20 pixels
      
      // Append the drawn card image to the card area with random transformations
      $cardArea.append(
        $('<img>', {
          src: cardSrc, // Source of the card image
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)` // Apply transformations
          }
        })
      );
      
      // If there are no cards remaining in the deck, remove the button
      if (data.remaining === 0) $btn.remove();
    });
  });
});
