// Generator type writing
let heading = document.querySelector("#typewriter");
let text = "generator";
let speed = 120;
let delay = 3000;
let pause = 500;
let index = 0;
function typeNextChar() {
  // If the index is less than the text length, type the next character
  if (index < text.length) {
    // Append the next character to the h1 element
    heading.innerHTML += text.charAt(index);

    // Increment the index
    index++;

    // Set a timer to call this function again after the speed delay
    setTimeout(typeNextChar, speed);
  } else {
    // Set a timer to clear the h1 element after the delay
    setTimeout(function () {
      heading.innerHTML = "";
      // Set another timer to call this function again after the pause
      setTimeout(typeNextChar, pause);
    }, delay);

    // Reset the index
    index = 0;
  }
}

typeNextChar();

// Get the input element
var input = document.getElementById("poem-topic-box");

// Define a function to adjust the input width
function adjustWidth() {
  // Get the input value
  var value = input.value;

  // Get the number of characters in the input value
  var length = value.length;

  // Set the input width to 10 pixels times the number of characters
  input.style.width = 10 * length + "px";
}

// Create an array of poem types
var poemTypes = [
  "Random",
  "Sonnet",
  "Villanelle",
  "Haiku",
  "Ballad",
  "Limerick",
  "Free verse",
  "Acrostic",
  "Cinquain",
  "Epic",
];

// Generate a random index from the array
var randomIndex = Math.floor(Math.random() * poemTypes.length);

// Access the corresponding element from the array
var randomPoemType = poemTypes[randomIndex];

// Store the URL of the API endpoint
var url = "https://www.poem-generator.org.uk/api/";

// Store the parameters of the API request
var params = { type: randomPoemType, keywords: "some keywords" };

/* Define an async function
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
*/
