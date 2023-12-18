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

document.addEventListener("DOMContentLoaded", function () {
  let poemContainer = document.querySelector("#poem-container");
  let createAnotherPoemButton = document.querySelector(
    "#create-another-poem-button"
  );

  async function makeGetRequest(apiUrl, apiKey) {
    let headers = {
      Authorization: `Bearer ${apiKey}`,
    };

    try {
      const response = await axios.get(apiUrl);
      return response.data.answer;
      console.log(response.data.answer);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function fetchData(apiUrl, apiKey) {
    try {
      const response = await makeGetRequest(apiUrl, apiKey);
      // Display generated poem
      poemContainer.textContent = response;
    } catch (error) {}
  }

  let submitButton = document.querySelector("#submit-button");
  submitButton.addEventListener("click", function () {
    let reloadButton = document.querySelector("#reload-button");
    // Hide the button initially
    reloadButton.style.display = "none";
    // Show the button when the poem is received
    reloadButton.style.display = "block";
  });

  // Example usage:
  let prompt = "love";
  let context = "poem";
  let apiKey = "7166fo94tf124f43f80bab7387ed0a26";

  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  // Invoke the fetchData function
  fetchData(apiUrl, apiKey);
});
