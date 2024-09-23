// Define a favorite number
let favNumber = 5; 
// Define the base URL for the Numbers API
let baseURL = "http://numbersapi.com";

// 1. Fetch a fact about the favorite number and log it to the console
$.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
  // Log the received data (which includes the fact)
  console.log(data);
});

// 2. Define an array of favorite numbers
let favNumbers = [7, 11, 22];
// Fetch facts for multiple favorite numbers and log them to the console
$.getJSON(`${baseURL}/${favNumbers}?json`, function(data) {
  // Log the received data for all the favorite numbers
  console.log(data);
});

// 3. Create an array to hold multiple facts about the favorite number
let facts = [];

// Fetch a fact about the favorite number and push it to the facts array
$.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
  facts.push(data.text); // Add the first fact to the array

  // Fetch the second fact about the same favorite number
  $.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
    facts.push(data.text); // Add the second fact to the array

    // Fetch the third fact about the same favorite number
    $.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
      facts.push(data.text); // Add the third fact to the array

      // Fetch the fourth fact about the same favorite number
      $.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
        facts.push(data.text); // Add the fourth fact to the array

        // Once all facts are fetched, iterate through the facts array
        facts.forEach(fact => {
          // Append each fact as a paragraph to the body of the HTML document
          $("body").append(`<p>${fact}</p>`); 
        });
      });
    });
  });
});
