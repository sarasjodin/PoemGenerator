// Type writing functionality
let heading = document.querySelector("#typewriter");
let text = " generator";
let speed1 = 120;
let delay1 = 3000;
let pause1 = 500;
let index1 = 0;
let isTypeNextWordActive = false; // Variable to track if typeNextWord is active

function typeNextChar() {
  // If typeNextWord is active, pause typeNextChar
  if (isTypeNextWordActive) {
    setTimeout(typeNextChar, 1000); // Adjust the pause duration as needed
    return;
  }

  // If the index is less than the text length, type the next character
  if (index1 < text.length) {
    // Append the next character to the h1 element
    heading.innerHTML += text.charAt(index1);
    // Increment the index
    index1++;
    // Set a timer to call this function again after the speed delay
    setTimeout(typeNextChar, speed1);
  } else {
    // Set a timer to clear the h1 element after the delay
    setTimeout(function () {
      heading.innerHTML = "";
      // Set another timer to call this function again after the pause
      setTimeout(typeNextChar, pause1);
    }, delay1);
    // Reset the index
    index1 = 0;
  }
}

typeNextChar();

// Type writing functionality for words
let words = []; // You need to set this array with words from your response
let typewritingPoem = document.querySelector("#inner-form-element");
let speed2 = 120;
let delay2 = 3000;
let pause2 = 500;
let index2 = 0;

function typeNextWord() {
  // If the index is less than the number of words
  if (index2 < words.length) {
    // Append the next word to the h1 element
    typewritingPoem.innerHTML += words[index2] + " ";
    // Increment the index
    index2++;
    // Set a timer to call this function again after the speed delay
    setTimeout(typeNextWord, speed2);
  } else {
    // Reset the index
    index2 = 0;
    isTypeNextWordActive = false; // Set typeNextWord as inactive
  }
}

// Initialize contextValue
let contextValue = "The poem should be short with only one row and speak about sport.";

// Function to set and update contextValue
function setContextValue() {
  let poemTopicBox = document.getElementById("poem-topic-box");
  
  // Update contextValue if the text box value changes
  poemTopicBox.addEventListener("input", function () {
    contextValue = poemTopicBox.value.trim() !== "" ? poemTopicBox.value : "The poem should be short with only one row and speak about sport.";
  });
  
  // Set the initial value of the text box
  poemTopicBox.value = contextValue;
}

function collectFormData() {
  // Select the form element
  let form = document.getElementById("poem-form-element");

  // Create arrays to store the collected data (encoded and unencoded)
  let encodedFormData = [];
  let unencodedFormData = [];

  // Iterate through form elements
  for (let i = 0; i < form.elements.length; i++) {
    let element = form.elements[i];

    // Check element type
    switch (element.type) {
      case "radio":
      case "checkbox":
        // Check if the radio button or checkbox is checked
        if (element.checked) {
          // Add the custom-data attribute to both arrays
          encodedFormData.push(
            encodeURIComponent(element.getAttribute("custom-data"))
          );
          unencodedFormData.push(element.getAttribute("custom-data"));
        }
        break;
      case "textarea":
      case "text":
        // Check if the textarea or text input has a value
        if (element.value.trim() !== "") {
          // Add the text value to both arrays
          encodedFormData.push(encodeURIComponent(element.value));
          unencodedFormData.push(element.value);
        }
        break;
      case "select-one":
        // Check if the select element has a selected option
        if (element.selectedIndex !== -1) {
          // Add the custom-data attribute to both arrays
          encodedFormData.push(
            encodeURIComponent(
              element.options[element.selectedIndex].getAttribute("custom-data")
            )
          );
          unencodedFormData.push(
            element.options[element.selectedIndex].getAttribute("custom-data")
          );
        }
        break;
    }
  }

  // Convert the collected data to strings
  let jsonData = encodedFormData.join(" ");
  let unencodedData = unencodedFormData.join(" ");
  let contextValue = document.getElementById("poem-topic-box").value;
  // Set a default context value if the text box is empty
  let context =
    contextValue.trim() !== ""
      ? contextValue
      : "The poem should be short with only one row and speak about sport.";

  // Update the content of the textarea dynamically
  let poemTopicBox = document.getElementById("poem-topic-box");
  if (poemTopicBox) {
    // Set the placeholder based on the condition
    poemTopicBox.placeholder =
      context.trim() !== ""
        ? `${context}`
        : "Please, be nice and clear, give enough details, & don’t repeat yourself.";
  }

  return { jsonData, unencodedData, context };
}

document.addEventListener("DOMContentLoaded", function () {
  setContextValue();
  poemContainer = document.querySelector("#poem-container");
  let submitButton = document.querySelector("#submit-button");
  let buttonPlaceholder = document.querySelector("#button-placeholder");
  let reloadButton;
  let defaultWaitingMessage;
  let prompt;

  submitButton.addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    /* console.log("Submit button clicked"); */

    // Retrieve the value of the text box
    let contextValue = document.getElementById("poem-topic-box").value;

    const { jsonData, unencodedData, context } = collectFormData();
    /* console.log("jsonData:", jsonData);
    console.log("unencodedData:", unencodedData); */

    // Check if the value is empty, and set a default value if needed
    contextValue.trim() !== ""
      ? contextValue
      : "The poem should be short with only one row and speak about sport.";

    // Update the content of the div with the contextValue and unencodedData
    let defaultValueMessage = document.getElementById("defaultValue-message");
    if (defaultValueMessage) {
      let finalContext =
        contextValue.trim() !== ""
          ? `You've requested a poem with the following criteria: "${unencodedData}"`
          : `You've requested a poem with the following criteria: "${unencodedData} ${context}"`;

      defaultValueMessage.innerHTML = finalContext;
    }

    // Show the poem container
    poemContainer.style.display = "block";

    async function makeGetRequest(apiUrl, apiKey) {
      let headers = {
        Authorization: `Bearer ${apiKey}`,
      };

      try {
        const response = await axios.get(apiUrl);
        return response.data.answer;
      } catch (error) {
        console.error("Error making GET request:", error);
        throw error;
      }
    }

    async function fetchData(apiUrl, apiKey) {
      try {
        const response = await makeGetRequest(apiUrl, apiKey);
        defaultWaitingMessage.style.display = "none";

        // Display generated poem
        words = response.split(" "); // Split the poem into words
        /* console.log(words); */
        typeNextWord(); // Start typing words
        /* } */
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(
          "I have some problems generating the poem. Please, check your internet connection. If the problem persists, contact sarasjodin.com. Best regards Sara, your personal Poem Bot."
        );
      }
    }

    // Example usage:
    prompt = unencodedData;
    /* console.log("prompt:", prompt); */
    let apiKey = "7166fo94tf124f43f80bab7387ed0a26";

    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${encodeURIComponent(
      context
    )}&key=${apiKey}`;

    // Invoke the fetchData function
    fetchData(apiUrl, apiKey);

    // Create defaultWaitingMessage dynamically
    defaultWaitingMessage = document.createElement("div");
    defaultWaitingMessage.id = "waiting-message";
    defaultWaitingMessage.innerText = "Please wait for your poem...";
    defaultWaitingMessage.style.display = "none";

    // Append the defaultWaitingMessage before the reloadButton
    document.getElementById("waiting-message");
    poemContainer.parentElement.appendChild(defaultWaitingMessage);

    reloadButton = document.createElement("button");
    reloadButton.id = "reload-button";
    reloadButton.innerText = "Create another poem";
    reloadButton.style.display = "none";
    reloadButton.addEventListener("click", function () {
      location.reload();
    });

    document.querySelector("main").appendChild(reloadButton);

    // Append the reloadButton to the same parent as poemContainer
    buttonPlaceholder.parentElement.appendChild(reloadButton);

    // Ensure reloadButton is defined before modifying its style
    if (reloadButton) {
      reloadButton.style.display = "block";
      reloadButton.style.margin = "auto"; // Center horizontally
    }

    // Use requestAnimationFrame to ensure proper timing for visibility toggle
    requestAnimationFrame(function () {
      defaultWaitingMessage.style.display = "block";
      defaultWaitingMessage.style.margin = "auto"; // Center horizontally
    });
  });
});
