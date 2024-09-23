// Use jQuery's shorthand for document ready to ensure the DOM is fully loaded before executing the code
$(function() {
  // Define the base URL for the Pokémon API
  let baseURL = "https://pokeapi.co/api/v2";

  // 1. Fetch the first 1000 Pokémon and log the entire response
  $.getJSON(`${baseURL}/pokemon/?limit=1000`).then(data => {
    console.log(data); // Log the data containing all Pokémon information
  });

  // 2. Fetch 3 random Pokémon and log their data
  $.getJSON(`${baseURL}/pokemon/?limit=1000`)
    .then(data => {
      let randomPokemonUrls = []; // Array to hold URLs of random Pokémon
      for (let i = 0; i < 3; i++) {
        // Select 3 random Pokémon URLs
        let randomIdx = Math.floor(Math.random() * data.results.length);
        let url = data.results.splice(randomIdx, 1)[0].url; // Remove selected URL from the array to avoid duplicates
        randomPokemonUrls.push(url); // Add the selected URL to the array
      }
      // Fetch data for all selected Pokémon URLs simultaneously
      return Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
    })
    .then(pokemon => {
      // Log each Pokémon's data
      pokemon.forEach(p => console.log(p));
    });

  // 3. Fetch descriptions for 3 random Pokémon
  let names = null; // Variable to hold Pokémon names
  $.getJSON(`${baseURL}/pokemon/?limit=1000`)
    .then(data => {
      let randomPokemonUrls = []; // Array to hold URLs of random Pokémon
      for (let i = 0; i < 3; i++) {
        // Select 3 random Pokémon URLs
        let randomIdx = Math.floor(Math.random() * data.results.length);
        let url = data.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url); // Add selected URL to the array
      }
      // Fetch data for all selected Pokémon URLs simultaneously
      return Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
    })
    .then(data => {
      // Store the names of the fetched Pokémon
      names = data.map(d => d.name);
      // Fetch species data for each Pokémon to get descriptions
      return Promise.all(data.map(d => $.getJSON(d.species.url)));
    })
    .then(data => {
      // Extract and log the descriptions for each Pokémon
      let descriptions = data.map(d => {
        let descriptionObj = d.flavor_text_entries.find(
          entry => entry.language.name === "en" // Find English description
        );
        return descriptionObj ? descriptionObj.flavor_text : "No description available."; 
      });
      // Log each Pokémon's name with its description
      descriptions.forEach((desc, i) => {
        console.log(`${names[i]}: ${desc}`);
      });
    });

  // 4. Setup button click to fetch and display Pokémon
  let $btn = $("button"); // Select the button for fetching Pokémon
  let $pokeArea = $("#pokemon-area"); // Select the area where Pokémon will be displayed

  // Event listener for button click
  $btn.on("click", function() {
    $pokeArea.empty(); // Clear the display area before fetching new Pokémon
    let namesAndImages = []; // Array to hold Pokémon names and images

    // Fetch the first 1000 Pokémon again
    $.getJSON(`${baseURL}/pokemon/?limit=1000`)
      .then(data => {
        let randomPokemonUrls = []; // Array to hold URLs of random Pokémon
        for (let i = 0; i < 3; i++) {
          // Select 3 random Pokémon URLs
          let randomIdx = Math.floor(Math.random() * data.results.length);
          let url = data.results.splice(randomIdx, 1)[0].url; // Remove selected URL to avoid duplicates
          randomPokemonUrls.push(url); // Add the selected URL to the array
        }
        // Fetch data for all selected Pokémon URLs simultaneously
        return Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
      })
      .then(pokemonData => {
        // Store names and default sprite URLs for the fetched Pokémon
        namesAndImages = pokemonData.map(p => ({
          name: p.name,
          imgSrc: p.sprites.front_default
        }));
        // Fetch species data for each Pokémon to get descriptions
        return Promise.all(pokemonData.map(p => $.getJSON(p.species.url)));
      })
      .then(speciesData => {
        // For each Pokémon, create a card and append it to the display area
        speciesData.forEach((d, i) => {
          let descriptionObj = d.flavor_text_entries.find(function(entry) {
            return entry.language.name === "en"; // Find English description
          });
          let description = descriptionObj ? descriptionObj.flavor_text : ""; // Get description or set to empty
          let { name, imgSrc } = namesAndImages[i]; // Destructure name and image source
          $pokeArea.append(makePokeCard(name, imgSrc, description)); // Append the card to the display area
        });
      });
  });

  // Function to create a Pokémon card HTML structure
  function makePokeCard(name, imgSrc, description) {
    return `
      <div class="card">
        <h1>${name}</h1> <!-- Pokémon name -->
        <img src=${imgSrc} /> <!-- Pokémon image -->
        <p>${description}</p> <!-- Pokémon description -->
      </div>
    `;
  }
});
