/**
 * Sets the local time zone in the `.timezone` element
 * based on the user's browser, including the GMT offset.
 */
export function setTimezone() {
  // Gets the time zone identifier
  const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Calculates the offset in minutes and converts to hours
  const offsetInMinutes = new Date().getTimezoneOffset();
  const offsetInHours = -offsetInMinutes / 60;

  // Formats the offset for display
  const gmtOffset = `GMT${offsetInHours >= 0 ? "+" : ""}${offsetInHours}`;

  // Updates the contents of the `.timezone` element
  const timezoneDisplay = document.querySelector(".timezone");
  if (timezoneDisplay) {
    timezoneDisplay.textContent = `${gmtOffset} (${timeZoneName})`;
  }
}