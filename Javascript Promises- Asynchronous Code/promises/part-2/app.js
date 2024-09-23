// Use jQuery's shorthand for document ready to ensure the DOM is fully loaded before executing the code
$(function() {
  // Define the base URL for the Deck of Cards API
  let baseURL = 'https://deckofcardsapi.com/api/deck';

  // 1. Fetch a single card from a new deck and log its value and suit
  $.getJSON(`${baseURL}/new/draw/`).then(data => {
    // Destructure to get the suit and value of the first card in the response
    let { suit, value } = data.cards[0];
    // Log the card's value and suit in lowercase
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });

  // 2. Draw two cards from a deck and log their values and suits
  let firstCard = null; // Variable to hold the first drawn card

  // Fetch the first card from a new deck
  $.getJSON(`${baseURL}/new/draw/`)
    .then(data => {
      firstCard = data.cards[0]; // Store the first card
      let deckId = data.deck_id; // Get the deck ID for subsequent draws
      // Fetch the second card from the same deck
      return $.getJSON(`${baseURL}/${deckId}/draw/`);
    })
    .then(data => {
      // Get the second card from the response
      let secondCard = data.cards[0];
      // Log both cards' values and suits
      [firstCard, secondCard].forEach(function(card) {
        console.log(
          `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
      });
    });

  // 3. Set up a button to draw cards and display them on the page
  let deckId = null; // Variable to hold the deck ID
  let $btn = $('button'); // Select the button to trigger card draws
  let $cardArea = $('#card-area'); // Select the area to display drawn cards

  // Shuffle a new deck and store the deck ID
  $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
    deckId = data.deck_id; // Save the deck ID for later use
    $btn.show(); // Show the button to allow users to draw cards
  });

  // Event listener for the button click to draw a card
  $btn.on('click', function() {
    // Fetch a card from the deck using the stored deck ID
    $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
      // Get the image source of the drawn card
      let cardSrc = data.cards[0].image;
      // Generate random values for rotation and translation
      let angle = Math.random() * 90 - 45; // Random rotation between -45 and 45 degrees
      let randomX = Math.random() * 40 - 20; // Random X translation
      let randomY = Math.random() * 40 - 20; // Random Y translation

      // Append the drawn card image to the card area with random transformation
      $cardArea.append(
        $('<img>', {
          src: cardSrc, // Set the image source
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)` // Apply transformations
          }
        })
      );

      // If no cards remain in the deck, remove the button to prevent further draws
      if (data.remaining === 0) $btn.remove();
    });
  });
});
