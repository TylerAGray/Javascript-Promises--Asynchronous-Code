// Use jQuery's shorthand for document ready to ensure the DOM is fully loaded before executing the code
$(function() {
  // Define the base URL for the Deck of Cards API
  let baseURL = 'https://deckofcardsapi.com/api/deck';

  // 1. Function to draw a single card from a new deck
  async function part1() {
    // Make an asynchronous GET request to draw a card from a new deck
    let data = await $.getJSON(`${baseURL}/new/draw/`);
    // Destructure the suit and value from the drawn card
    let { suit, value } = data.cards[0];
    // Log the card's value and suit in lowercase to the console
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }

  // 2. Function to draw two cards from the same deck
  async function part2() {
    // Draw the first card from a new deck
    let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
    // Store the deck ID for future draws
    let deckId = firstCardData.deck_id;
    // Draw the second card from the same deck using the stored deck ID
    let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    // Iterate over both card data to log their values and suits
    [firstCardData, secondCardData].forEach(card => {
      let { suit, value } = card.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  }

  // 3. Function to set up the card drawing interface
  async function setup() {
    // Cache jQuery objects for the button and card area
    let $btn = $('button'); // Button for drawing a card
    let $cardArea = $('#card-area'); // Area to display drawn cards

    // Create and shuffle a new deck
    let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
    // Show the button and add a click event listener
    $btn.show().on('click', async function() {
      // Draw a card from the shuffled deck
      let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
      // Get the image source of the drawn card
      let cardSrc = cardData.cards[0].image;
      // Generate random values for rotation and position
      let angle = Math.random() * 90 - 45; // Random rotation between -45 and 45 degrees
      let randomX = Math.random() * 40 - 20; // Random X translation between -20 and 20 pixels
      let randomY = Math.random() * 40 - 20; // Random Y translation between -20 and 20 pixels

      // Append the drawn card image to the card area with CSS transformations for randomness
      $cardArea.append(
        $('<img>', {
          src: cardSrc, // Source of the card image
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)` // Apply transformations
          }
        })
      );

      // If there are no cards remaining in the deck, remove the button
      if (cardData.remaining === 0) $btn.remove();
    });
  }

  // Call the setup function to initialize the card drawing feature
  setup();
});

