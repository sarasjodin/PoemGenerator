// Type writing functionality
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

// Create the js for the form

function generatePoem(event) {
  event.preventDefault();

  let poemContainer = document.querySelector("#poem");
  poemFormElement.innerHTML = "Text, text";
}

let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.defaultValue =
  "Please help me create a poem for my dearest friend, who always supports me and always have time to listen. We first got to know each other at work and then we started seeing each other also on our spare time. When I want to celebrate something or share a burden my friend is always there for me.";
console.log(poemFormElement.defaultValue); // Prints the default value
poemFormElement.addEventListener("submit", generatePoem);

// Get the input element
let input = document.getElementById("poem-topic-box");

// Create "Create another poem" button dynamically
let createAnotherPoemButton = document.createElement("button");
createAnotherPoemButton.id = "create-another-poem-button";
createAnotherPoemButton.innerText = "Create another poem";
createAnotherPoemButton.style.display = "none"; // Hide the button initially
createAnotherPoemButton.addEventListener("click", function () {
  // Reload the page on button click
  location.reload();
});

// Append the button to the main container
document.querySelector("main").appendChild(createAnotherPoemButton);

// Show the button immediately after clicking "Submit"
document.getElementById("submit-button").addEventListener("click", function () {
  createAnotherPoemButton.style.display = "inline-block";
});

let textInfo = document.createElement("p");
textInfo.id = "text-info";
textInfo.style.display = "none"; // Hide the text information initially

// Append the text information to the main container
document.querySelector("main").appendChild(textInfo);

// Add an event listener to the form submit event
poemFormElement.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the value of the textarea
  let value = input.value;

  // Check if the value is equal to the default value
  if (value == poemFormElement.defaultValue) {
    // Set the text information
    textInfo.textContent =
      "*In the box where you are supposed to add your poem expectations, no additional information was added, therefore this poem was generated with the following default text: " +
      poemFormElement.defaultValue;
    // Show the text information
    textInfo.style.display = "block";
  } else {
    // Clear the text information
    textInfo.textContent = "";
    // Hide the text information
    textInfo.style.display = "none";
  }
});

// Define a function to adjust the input width
/* function adjustWidth() {
 */ // Get the input value
/*   let value = input.value;
 */
// Get the number of characters in the input value
/*   let length = value.length;
 */
// Set the input width to 10 pixels times the number of characters
/*   input.style.width = 5 * length + "px";
}
 */
// Create an array of poem types
let poemTypes = [
  "Christmas gift poem that rhyme",
  "Gift poem that rhyme",
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
let randomIndex = Math.floor(Math.random() * poemTypes.length);

// Access the corresponding element from the array
let randomPoemType = poemTypes[randomIndex];

// Store the URL of the API endpoint
let url = "https://www.poem-generator.org.uk/api/";

// Store the parameters of the API request
let params = { type: randomPoemType, keywords: "some keywords" };

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
makePostRequest();*/
