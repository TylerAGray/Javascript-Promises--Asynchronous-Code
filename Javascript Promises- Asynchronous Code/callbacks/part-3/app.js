// Use jQuery's shorthand for document ready to ensure the DOM is fully loaded before executing the code
$(function() {
  // Define the base URL for the Pokémon API
  let baseURL = "https://pokeapi.co/api/v2";

  // 1. Fetch the list of Pokémon (limit to 1000) and log the data to the console
  $.getJSON(`${baseURL}/pokemon/?limit=1000`, function(data) {
    console.log(data); // Log the entire response data for inspection
  });

  // 2. Fetch a list of Pokémon and randomly select 3 Pokémon to fetch their details
  $.getJSON(`${baseURL}/pokemon/?limit=1000`, function(data) {
    let randomPokemonUrls = []; // Array to hold URLs of randomly selected Pokémon

    // Loop to select 3 random Pokémon
    for (let i = 0; i < 3; i++) {
      // Generate a random index
      let randomIdx = Math.floor(Math.random() * data.results.length);
      // Remove the selected Pokémon from the list and get its URL
      let url = data.results.splice(randomIdx, 1)[0].url;
      // Push the URL to the array
      randomPokemonUrls.push(url);
    }

    // Fetch details for each randomly selected Pokémon
    randomPokemonUrls.forEach(function(url) {
      $.getJSON(url, function(data) {
        console.log(data); // Log the details of each Pokémon to the console
      });
    });
  });

  // 3. Similar to step 2, but fetch and log descriptions of the randomly selected Pokémon
  $.getJSON(`${baseURL}/pokemon/?limit=1000`, function(data) {
    let randomPokemonUrls = []; // Array to hold URLs of randomly selected Pokémon

    // Loop to select 3 random Pokémon
    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * data.results.length);
      let url = data.results.splice(randomIdx, 1)[0].url;
      randomPokemonUrls.push(url);
    }

    // Fetch details for each selected Pokémon
    randomPokemonUrls.forEach(function(url) {
      $.getJSON(url, function(data) {
        let name = data.name; // Get the name of the Pokémon
        
        // Fetch the species data to get the description
        $.getJSON(data.species.url, function(data) {
          // Find the English description from flavor text entries
          let descriptionObj = data.flavor_text_entries.find(
            entry => entry.language.name === "en"
          );
          // If found, use it; otherwise, set a default message
          let description = descriptionObj
            ? descriptionObj.flavor_text
            : "No description available.";
          // Log the name and description of the Pokémon
          console.log(`${name}: ${description}`);
        });
      });
    });
  });

  // 4. Set up a button to fetch and display random Pokémon on the webpage
  let $btn = $("button"); // Select the button for triggering the fetch
  let $pokeArea = $("#pokemon-area"); // Select the area to display Pokémon cards

  // Event listener for button clicks
  $btn.on("click", function() {
    $pokeArea.empty(); // Clear the previous Pokémon displayed
    // Fetch the list of Pokémon again
    $.getJSON(`${baseURL}/pokemon/?limit=1000`, function(data) {
      let randomPokemonUrls = []; // Array to hold URLs of randomly selected Pokémon

      // Loop to select 3 random Pokémon
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * data.results.length);
        let url = data.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }

      // Fetch details for each randomly selected Pokémon
      randomPokemonUrls.forEach(function(url, i) {
        $.getJSON(url, function(data) {
          let name = data.name; // Get the name of the Pokémon
          let imgSrc = data.sprites.front_default; // Get the default sprite image source

          // Fetch the species data for the description
          $.getJSON(data.species.url, function(data) {
            let descriptionObj = data.flavor_text_entries.find(
              entry => entry.language.name === "en"
            );
            // Find the description or set a default message if not found
            let description = descriptionObj
              ? descriptionObj.flavor_text
              : "No description available.";

            // Append a card for the Pokémon to the designated area
            $pokeArea.append(makePokeCard(name, imgSrc, description));
          });
        });
      });
    });
  });

  // Function to create HTML structure for a Pokémon card
  function makePokeCard(name, imgSrc, description) {
    return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} />
        <p>${description}</p>
      </div>
    `;
  }
});
