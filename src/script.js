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

let typewritingPoem = document.querySelector("#inner-form-element");
function typeNextWord(poemText) {
  // Set the content of typewritingPoem without the typewriter effect
  typewritingPoem.innerHTML = poemText;
}

// Add the formatWord function
function formatWord(word) {
  // Replace newline characters with <br> tags

  return word
    .replace(/\r?\n\/r/g, " ")
    .replace(/,/g, "<br>")
    .replace(/\s+/g, " ");
}

// Initialize contextValue
let contextValue =
  'Compose a very short couplets poem in British English about a X-box Christmas gift from parents to daughter. Do not reveal "X-box" in the poem. Create an engaging title. Make sure to enclose the entire title within h3 tags. Arrange the lines by breaking only after commas and punctuations. Additionally, structure each stanza into paragraphs enclosed within p tags. Avoid creating lines with only a single word or multiple consecutive line breaks. Your creativity as my personal Poem Writer will bring this poem to life.';

// Function to set and update contextValue
function setContextValue() {
  let poemTopicBox = document.getElementById("poem-topic-box");

  // Update contextValue if the text box value changes
  poemTopicBox.addEventListener("input", function () {
    contextValue =
      poemTopicBox.value.trim() !== ""
        ? poemTopicBox.value
        : "The poem should be short with only one row and speak about sport.";
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
  let choosePoemConvention = document.querySelector("#choose-poem-convention");
  let choosePoemRhymes = document.querySelector("#choose-poem-rhymes");
  let choosePoemStyle = document.querySelector("#choose-poem-style");
  let addPoemTopic = document.querySelector("#add-poem-topic");
  let innerFormElement = document.querySelector("#inner-form-element");
  let reloadButton;
  let waitingMessage = document.querySelector("#waiting-message");
  let prompt;

  submitButton.addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // To hide the button and other elements
    submitButton.setAttribute("hidden", true);
    choosePoemConvention.setAttribute("hidden", true);
    choosePoemRhymes.setAttribute("hidden", true);
    choosePoemStyle.setAttribute("hidden", true);
    addPoemTopic.setAttribute("hidden", true);
    // To show the message
    waitingMessage.removeAttribute("hidden");

    // Retrieve the value of the text box
    let contextValue = document.getElementById("poem-topic-box").value;

    const { jsonData, unencodedData, context } = collectFormData();
    console.log("jsonData:", jsonData);
    console.log("unencodedData:", unencodedData);

    // Check if the value is empty, and set a default value if needed
    contextValue.trim() !== ""
      ? contextValue
      : "The poem should be short with only one row and speak about sport.";

    // Update the content of the div with the contextValue and unencodedData
    let defaultValueMessage = document.getElementById("default-value-message");
    if (defaultValueMessage) {
      let finalContext =
        contextValue.trim() !== ""
          ? `<h4>Your poem criteria</h4> "${unencodedData}"`
          : `<h4>Your poem criteria</h4> "${unencodedData} ${context}"`;

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
        waitingMessage.style.display = "none";

        // Display generated poem
        words = response.split(" "); // Split the poem into words
        typewritingPoem.innerHTML = "";
        // Start typing words
        console.log(words);

        // Start typing words
        typeNextWord(words.map(formatWord).join(" "));

        showAuthorSignature();
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(
          "I have some problems generating the poem. Please, check your internet connection. If the problem persists, contact sarasjodin.com. Best regards Sara, your personal Poem Bot."
        );
      }
    }

    function showAuthorSignature() {
      // Show the author signature when the poem has been typed
      let authorSignature = document.getElementById("author-signature");
      let authorName = document.getElementById("author-name");
      if (authorSignature) {
        authorSignature.removeAttribute("hidden");
        authorName.removeAttribute("hidden");
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
    } /* ); */
  });
});
