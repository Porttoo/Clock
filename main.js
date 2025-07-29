// Imports organized by function
import { numberPosition } from "./scripts/numberPosition.js";
import { updateClock } from "./scripts/updateClock.js";
import { getLocation } from "./scripts/location.js";
import { setTimezone } from "./scripts/timezone.js";
import { showTemperature } from "./scripts/temperature.js";
import { updateTheme } from "./scripts/theme.js";

// Runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    numberPosition(); // Dynamically position numbers around the clock
  }, 50)
  updateClock();
  setInterval(updateClock, 1000);
  // Get location and display temperature using callback
  getLocation((lat, lon) => {
    showTemperature(lat, lon);
  });
  setTimezone(); // Displays the local time zone
  updateTheme(new Date()); // Applies the theme based on the current time
  setInterval(() => updateTheme(new Date()), 60000); // Updates theme every minute (smooth background/light animations)
});
