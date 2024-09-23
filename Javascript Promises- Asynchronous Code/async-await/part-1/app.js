// Define the favorite number variable
let favNumber = 5; // This should be your favorite number
let baseURL = "http://numbersapi.com"; // Base URL for the Numbers API

// 1. Function to get a fact about the favorite number
async function part1() {
  // Make an asynchronous GET request to the Numbers API for the favorite number
  let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
  // Log the returned data (which contains the fact)
  console.log(data);
}

// Call part1 function to execute the request
part1();

// 2. Define an array of favorite numbers
const favNumbers = [7, 11, 22]; // Replace with your favorite numbers

// Function to get facts about multiple favorite numbers
async function part2() {
  // Make an asynchronous GET request to the Numbers API for multiple numbers
  let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
  // Log the returned data (which contains the facts for the favorite numbers)
  console.log(data);
}

// Call part2 function to execute the request
part2();

// 3. Function to get 4 facts about the favorite number
async function part3() {
  // Create an array of promises to fetch the favorite number fact 4 times
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
  );
  // Iterate over each fact and append it to the body of the HTML document
  facts.forEach(data => {
    $('body').append(`<p>${data.text}</p>`); // Append each fact as a paragraph
  });
}

// Call part3 function to execute the requests
part3();
let favNum