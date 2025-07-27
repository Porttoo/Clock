const WEATHER_API_KEY = "c7b5554e965bd0a6646fca1f88d28e5b";

/**
 * Fetches and displays the current temperature according to the provided geographic coordinates.
 *
 * @param {number} lat - Latitude of the location
 * @param {number} lon - Longitude of the location
 */
export function showTemperature(lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=pt`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      // Checks if the response contains valid data
      if (!data.main || typeof data.main.temp !== "number") {
        throw new Error("Missing or invalid temperature data.");
      }

      const temperature = data.main.temp;
      const temperatureText = `Temperature: ${temperature.toFixed(1)}°C`;

      document.querySelector(".temperature").textContent = temperatureText;
    })
    .catch((error) => {
      console.error("Error when searching for weather:", error);
      document.querySelector(".temperature").textContent =
        "Error obtaining temperature";
    });
}