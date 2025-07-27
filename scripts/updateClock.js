/**
 * Updates the position of the clock hands based on the current time
 */
export function updateClock() {
  const now = new Date();

  // Gets hours, minutes and seconds
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12 + minutes / 60; // includes fraction of an hour for smoothness

  // Converts time to rotation angles (degrees)
  const secondAngle = seconds * 6; // 360° / 60s
  const minuteAngle = minutes * 6; // 360° / 60min
  const hourAngle = hours * 30;   // 360° / 12h

  // Select the elements of the clock hands
  const hourHand = document.querySelector(".hour-hand");
  const minuteHand = document.querySelector(".minute-hand");
  const secondHand = document.querySelector(".second-hand");

  // Applies rotation transformation to each clock hand
  hourHand.style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;
}