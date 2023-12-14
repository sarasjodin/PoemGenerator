// Import axios
import axios from "axios";

// Create an array of poem types
var poemTypes = ["Sonnet", "Villanelle", "Haiku", "Ballad", "Limerick", "Free verse", "Acrostic", "Cinquain", "Epic"];

// Generate a random index from the array
var randomIndex = Math.floor(Math.random() * poemTypes.length);

// Access the corresponding element from the array
var randomPoemType = poemTypes[randomIndex];

// Store the URL of the API endpoint
var url = "https://www.poem-generator.org.uk/api/";

// Store the parameters of the API request
var params = {type: randomPoemType, keywords: "some keywords"};

// Define an async function
async function makePostRequest() {
  try {
    // Make a POST request with axios and await the response
    let response = await axios.post(url, params);

    // Handle the response
    console.log(response.data);
  } catch (error) {
    // Handle the error
    console.error(error);
  }
}

// Call the async function
makePostRequest();
