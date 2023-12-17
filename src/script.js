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

// Function to display the poem
function displayPoem(response) {
  let poemContainer = document.querySelector("#poem-container");
  let createAnotherPoemButton = document.querySelector(
    "#create-another-poem-button"
  );

  // Show the generated poem
  poemContainer.innerHTML = response.data.answer;

  // Hide the form
  document.querySelector("#poem-generator-form").style.display = "none";

  // Show the poem container and the "Create another poem" button
  poemContainer.style.display = "block";
  createAnotherPoemButton.style.display = "inline-block";
}

// Create the js for the form

/* function generatePoem(event) {
  event.preventDefault();

  let poemContainer = document.querySelector("#poem");
  poemFormElement.innerHTML = "Text, text";
} */

let poemFormElement = document.querySelector("#poem-generator-form");
/* poemFormElement.defaultValue =
  "Please help me create a poem for my dearest friend, who always supports me and always have time to listen. We first got to know each other at work and then we started seeing each other also on our spare time. When I want to celebrate something or share a burden my friend is always there for me.";
console.log(poemFormElement.defaultValue); // Prints the default value */
poemFormElement.addEventListener("submit", generatePoem);

// Get the input element
/* let input = document.getElementById("poem-topic-box");
 */
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

/* let textInfo = document.createElement("p");
textInfo.id = "text-info";
textInfo.style.display = "none"; */ // Hide the text information initially

// Append the text information to the main container
/* document.querySelector("main").appendChild(textInfo);
 */
// Add an event listener to the form submit event
poemFormElement.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the value of the textarea
  let value = input.value;

  /*  // Check if the value is equal to the default value
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
  } */
});

// Create an array of poem types
let options = {
  "Christmas gift": [
    "This option will generate a Christmas gift poem that rhyme",
    "Add information about your gift, write if you want me to avoid mentioning the exact gift word or if you want the last rhyme to intend that word but leaving it out.",
  ],
  Gift: ["This option will generate a gift poem that rhyme", "yy"],
  Sonnet: [
    "This option will generate a 14-line poem that usually deals with love and has a specific rhyme scheme and meter. There are two main types of sonnets: Petrarchan and Shakespearean.",
    "xx",
  ],
  Haiku: [
    "This option will generate a three-line poem that originated in Japan and follows a syllable pattern of 5-7-5. Haikus usually refer to nature or a moment of beauty.",
    "xx",
  ],
  Limerick: [
    "This option will generate a humorous poem that consists of five lines, with a rhyme scheme of AABBA and a meter of three stressed syllables in the first, second, and fifth lines, and two stressed syllables in the third and fourth lines.",
    "xx",
  ],
  Ballad: [
    "This option will generate a narrative poem that tells a story, often in a musical or lyrical way. Ballads usually have a rhyme scheme of ABAB or ABCB and a meter of four or three stressed syllables per line.",
    "xx",
  ],
  Acrostic: [
    "This option will generate a type of poem that spells out a word or phrase using the first letter of each line. The lines can be full sentences or single words, and the word or phrase can be the title or a hidden message.",
    "xx",
  ],
  Villanelle: [
    "This option will generate a 19-line poem that consists of five tercets (three-line stanzas) and a final quatrain (four-line stanza), with two repeating lines throughout the poem.",
    "xx",
  ],
  Cinquain: [
    "This option will generate a five-line poem that follows a syllable pattern of 2-4-6-8-2. Cinquains can describe a person, place, thing, or idea, and can have different variations of form and rhyme.",
    "xx",
  ],
  Epic: [
    "This option will generate a long narrative poem that tells the adventures of a hero, often involving mythology, history, or legend. Epics usually have a formal style, a grand scope, and a serious tone.",
    "xx",
  ],
  "No style": [
    "This option does not have a regular meter or rhyme scheme, but it also does not look like a free verse poem. It uses unconventional punctuation, spacing, and line breaks.",
    "xx",
  ],
  "Free verse": [
    "This option will generate a type of poem that does not follow any rules of rhyme, meter, or form. Free verse poems can have any number of lines, stanzas, or syllables, and can express any topic or emotion.",
    "xx",
  ],
  Random: [
    "This option will generate a randomly chosen poem type from the list.",
    "xx",
  ],
};
// Generate a random index from the array
/* let randomIndex = Math.floor(Math.random() * poemTypes.length);
 */
// Access the corresponding element from the array
/* let randomPoemType = poemTypes[randomIndex]; */
function generatePoem(event) {
  event.preventDefault();
  // Hide the form after clicking "Submit"
  document.querySelector("#poem-generator-form").style.display = "none";

  // Store the URL of the API endpoint
  let prompt = "Write a short, 2-row Swedish poem about friendship";
  let context =
    "It should speak about two old friends. Create a title between <h3></h3> tags. Every row should be placed between <p></p> tags.";
  let apiKey = "7166fo94tf124f43f80bab7387ed0a26";

  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  // Store the parameters of the API request
  axios.get(apiUrl).then(displayPoem);
}
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
