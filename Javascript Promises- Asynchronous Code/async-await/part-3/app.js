// Use jQuery's shorthand for document ready to ensure the DOM is fully loaded before executing the code
$(function() {
  // Define the base URL for the Pokémon API
  let baseURL = "https://pokeapi.co/api/v2";

  // 1. Function to fetch and log Pokémon data
  async function part1() {
    // Make an asynchronous GET request to fetch a list of Pokémon (up to 1000)
    let data = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
    // Log the fetched data to the console
    console.log(data);
  }

  // 2. Function to fetch 3 random Pokémon and log their data
  async function part2() {
    // Fetch all Pokémon data
    let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
    // Array to hold URLs of randomly selected Pokémon
    let randomPokemonUrls = [];
    
    // Loop to select 3 random Pokémon
    for (let i = 0; i < 3; i++) {
      // Generate a random index to select a Pokémon
      let randomIdx = Math.floor(Math.random() * allData.results.length);
      // Extract the URL of the selected Pokémon and remove it from the results
      let url = allData.results.splice(randomIdx, 1)[0].url;
      // Add the URL to the array of random Pokémon URLs
      randomPokemonUrls.push(url);
    }

    // Fetch data for all selected Pokémon using their URLs
    let pokemonData = await Promise.all(
      randomPokemonUrls.map(url => $.getJSON(url))
    );
    // Log the data for each selected Pokémon to the console
    pokemonData.forEach(p => console.log(p));
  }

  // 3. Function to fetch 3 random Pokémon and their species descriptions
  async function part3() {
    // Fetch all Pokémon data
    let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
    // Array to hold URLs of randomly selected Pokémon
    let randomPokemonUrls = [];
    
    // Loop to select 3 random Pokémon
    for (let i = 0; i < 3; i++) {
      // Generate a random index to select a Pokémon
      let randomIdx = Math.floor(Math.random() * allData.results.length);
      // Extract the URL of the selected Pokémon and remove it from the results
      let url = allData.results.splice(randomIdx, 1)[0].url;
      // Add the URL to the array of random Pokémon URLs
      randomPokemonUrls.push(url);
    }

    // Fetch data for all selected Pokémon using their URLs
    let pokemonData = await Promise.all(
      randomPokemonUrls.map(url => $.getJSON(url))
    );
    // Fetch species data for each Pokémon
    let speciesData = await Promise.all(
      pokemonData.map(p => $.getJSON(p.species.url))
    );

    // Extract English descriptions from the species data
    let descriptions = speciesData.map(d => {
      let descriptionObj = d.flavor_text_entries.find(
        entry => entry.language.name === "en"
      );
      // Return the description if found, otherwise return a placeholder
      return descriptionObj
        ? descriptionObj.flavor_text
        : "No description available.";
    });

    // Log each Pokémon's name along with its description
    descriptions.forEach((desc, i) => {
      console.log(`${pokemonData[i].name}: ${desc}`);
    });
  }

  // 4. Set up the button click event to fetch random Pokémon and display them
  let $btn = $("button"); // Select the button for fetching Pokémon
  let $pokeArea = $("#pokemon-area"); // Select the area to display Pokémon cards

  // Event listener for the button click
  $btn.on("click", async function() {
    // Clear the current Pokémon area before fetching new data
    $pokeArea.empty();
    // Fetch all Pokémon data
    let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
    // Array to hold URLs of randomly selected Pokémon
    let randomPokemonUrls = [];
    
    // Loop to select 3 random Pokémon
    for (let i = 0; i < 3; i++) {
      // Generate a random index to select a Pokémon
      let randomIdx = Math.floor(Math.random() * allData.results.length);
      // Extract the URL of the selected Pokémon and remove it from the results
      let url = allData.results.splice(randomIdx, 1)[0].url;
      // Add the URL to the array of random Pokémon URLs
      randomPokemonUrls.push(url);
    }

    // Fetch data for all selected Pokémon using their URLs
    let pokemonData = await Promise.all(
      randomPokemonUrls.map(url => $.getJSON(url))
    );
    // Fetch species data for each Pokémon
    let speciesData = await Promise.all(
      pokemonData.map(p => $.getJSON(p.species.url))
    );

    // Loop through the species data to create and append Pokémon cards
    speciesData.forEach((d, i) => {
      // Find the English description from the flavor text entries
      let descriptionObj = d.flavor_text_entries.find(function(entry) {
        return entry.language.name === "en";
      });
      // Get the description or set it to an empty string if not found
      let description = descriptionObj ? descriptionObj.flavor_text : "";
      // Get the name and image source of the Pokémon
      let name = pokemonData[i].name;
      let imgSrc = pokemonData[i].sprites.front_default;
      // Append the Pokémon card to the display area
      $pokeArea.append(makePokeCard(name, imgSrc, description));
    });
  });

  // Function to create a Pokémon card HTML structure
  function makePokeCard(name, imgSrc, description) {
    return `
      <div class="card"> <!-- Create a card div for styling -->
        <h1>${name}</h1> <!-- Pokémon name -->
        <img src=${imgSrc} /> <!-- Pokémon image -->
        <p>${description}</p> <!-- Pokémon description -->
      </div>
    `;
  }
});
