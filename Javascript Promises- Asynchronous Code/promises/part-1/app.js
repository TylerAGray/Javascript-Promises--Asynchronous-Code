// Define a favorite number to fetch facts about
let favNumber = 5;
// Define the base URL for the Numbers API
let baseURL = "http://numbersapi.com";

// 1. Fetch a fact about the favorite number and log it to the console
$.getJSON(`${baseURL}/${favNumber}?json`).then(data => {
  console.log(data); // Log the entire response object, which includes the fact about the number
});

// 2. Define an array of favorite numbers
let favNumbers = [7, 11, 22];
// Fetch facts about multiple favorite numbers in a single request
$.getJSON(`${baseURL}/${favNumbers}?json`).then(data => {
  console.log(data); // Log the response object containing facts about each of the numbers
});

// 3. Fetch multiple facts (4 in this case) about the favorite number using Promise.all
Promise.all(
  Array.from({ length: 4 }, () => {
    // Create an array of promises by fetching a fact about the favorite number 4 times
    return $.getJSON(`${baseURL}/${favNumber}?json`);
  })
).then(facts => {
  // Once all promises are resolved, iterate over the array of facts
  facts.forEach(data => {
    // Append each fact's text to the body of the HTML document
    $("body").append(`<p>${data.text}</p>`); // Create a new paragraph for each fact
  });
});
