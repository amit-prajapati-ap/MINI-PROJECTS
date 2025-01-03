const apiKey = "8FGIoSjzUMWMwbDpqOBCTQ==uF3BeWuhn9RaVAz";
const category = "happiness";

fetch("https://api.api-ninjas.com/v1/quotes", {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log("Quotes:", data))
    .catch((error) => console.error("Error:", error));
  
