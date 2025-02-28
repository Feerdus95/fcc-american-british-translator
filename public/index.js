document.addEventListener('DOMContentLoaded', function() {
  // Initialize Materialize components
  var selects = document.querySelectorAll('select');
  M.FormSelect.init(selects);

  // Add event listener to the translate button
  document.getElementById("translate-btn").addEventListener("click", translateHandler);
});

const translateHandler = async () => {
  const textArea = document.getElementById("text-input");
  const localeArea = document.getElementById("locale-select");
  const translatedArea = document.getElementById("translated-sentence");
  const errorArea = document.getElementById("error-msg");
  
  // Clear previous results
  if (errorArea) errorArea.innerText = "";
  if (translatedArea) translatedArea.innerText = "";

  // Validate inputs
  if (!textArea || !localeArea) {
    console.error("Required elements not found");
    return;
  }

  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        text: textArea.value,
        locale: localeArea.value
      })
    });

    const parsed = await response.json();
    
    if (parsed.error) {
      if (errorArea) errorArea.innerText = parsed.error;
      return;
    }

    if (translatedArea) translatedArea.innerHTML = parsed.translation;
  } catch (error) {
    console.error("Translation error:", error);
    if (errorArea) errorArea.innerText = "An error occurred while translating. Please try again.";
  }
};