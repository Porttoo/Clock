// LocationIQ API Key for Reverse Geocoding
const API_KEY = "pk.05940e9913743d49b9ff868ba5ca1dbb";

/**
 * Search for the city name from geographic coordinates.
 * Updates the text of the element with class `.location` with the found name.
 * @param {number} lat - User latitude
 * @param {number} lon - User longitude
 */
function catchCity(lat, lon) {
  fetch(
    `https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${lat}&lon=${lon}&format=json` // Assemble the LocationIQ API URL for reverse geocoding
  )
    .then((res) => res.json())
    .then((data) => {
      // Prioritizes city, town, village, or state for the location name
      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.state ||
        "Unknown city";

      // Updates the page element with the city name
      document.querySelector(".location").textContent = city;
    })
    .catch((err) => {
      console.error("Error getting city:", err);
      document.querySelector(".location").textContent =
        "Error when locating city";
    });
}

/**
 * Gets the user's current location via the browser's Geolocation API.
 * If the location is successfully obtained, call catchCity to get the city name.
 * and executes the optional callback with latitude and longitude.
 * @param {function} [callback] - Function to call with lat and lon upon success
 */
export function getLocation(callback) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        catchCity(latitude, longitude); // Update the city name on the screen
        if (callback) callback(latitude, longitude); // Executes the callback, for example, to get temperature
      },
      (err) => {
        console.error("Geolocation error:", err);
        document.querySelector(".location").textContent = "Permission denied";
      }
    );
  } else {
    // Browser does not support geolocation
    document.querySelector(".location").textContent =
      "Geolocation not supported";
  }
}
