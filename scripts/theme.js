/**
 * Dynamically updates the clock theme based on the provided time,
 * interpolating colors to simulate a transitioning sky and adjusting shadows/brightness.
 *
 * @param {Date} date - Date object used as a time reference
 */
export function updateTheme(date) {
  const hour = date.getHours() + date.getMinutes() / 60;

  /**
   * Interpolates two hexadecimal colors.
   * @param {string} color1 - Initial color
   * @param {string} color2 - Final color
   * @param {number} t - Value between 0 and 1 representing the progress of the interpolation
   * @returns {string} Interpolated color in hexadecimal format
   */
  function lerpColor(color1, color2, t) {
    const from = color1.match(/\w\w/g).map((c) => parseInt(c, 16));
    const to = color2.match(/\w\w/g).map((c) => parseInt(c, 16));
    const result = from.map((v, i) => Math.round(v + (to[i] - v) * t));
    return `#${result.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  }

  // Sky colors for different times of the day
  const skyColors = [
    { hour: 0,  color1: "#0f2027", color2: "#203a43" }, // Deep night
    { hour: 6,  color1: "#fceabb", color2: "#f8b500" }, // Dawn
    { hour: 12, color1: "#f5af19", color2: "#f12711" }, // Midday
    { hour: 18, color1: "#654ea3", color2: "#eaafc8" }, // Sunset
    { hour: 20, color1: "#0f2027", color2: "#203a43" }, // Early evening
    { hour: 24, color1: "#0f2027", color2: "#203a43" }  // Looping
  ];

  // Finds the current range based on time
  let i = skyColors.findIndex((c, idx) => hour >= c.hour && hour < skyColors[idx + 1].hour);
  if (i === -1) i = 0;

  const { color1: from1, color2: from2 } = skyColors[i];
  const { color1: to1,   color2: to2   } = skyColors[i + 1];

  // Interpolated progress within hour range
  const t = (hour - skyColors[i].hour) / (skyColors[i + 1].hour - skyColors[i].hour);
  const bg1 = lerpColor(from1.replace("#", ""), to1.replace("#", ""), t);
  const bg2 = lerpColor(from2.replace("#", ""), to2.replace("#", ""), t);

  // Applies dynamic background gradient
  document.body.style.background = `linear-gradient(120deg, ${bg1}, ${bg2})`;

  // Sets sun shade (during the day) and glare (at night)
  const isNight = hour >= 18 || hour < 6;
  let dynamicShadow = "";
  let glowEffect = "0 0 10px white, 0 0 20px white";

  if (!isNight) {
    const progress = (hour - 6) / 12;
    const x = 20 * Math.cos(progress * Math.PI);
    const y = 20 * Math.sin(progress * Math.PI);
    dynamicShadow = `${x}px ${y}px 10px rgba(0,0,0,0.3)`;
  }

  // Applies shadow or glow to the clock hands and numbers
  document.querySelectorAll(".number, .hand").forEach((el) => {
    const isNumber = el.classList.contains("number");

    if (isNumber) {
      el.style.textShadow = isNight ? glowEffect : dynamicShadow;
      el.style.webkitTextShadow = el.style.textShadow;
      el.style.filter = isNight ? "brightness(1.3)" : "none";
      el.style.boxShadow = "none";
    } else {
      el.style.textShadow = "none"; // divs don't support text-shadow well
      el.style.boxShadow = isNight ? glowEffect : dynamicShadow;
      el.style.webkitBoxShadow = el.style.boxShadow;
      el.style.filter = isNight ? "brightness(1.5)" : "none";
      el.style.webkitFilter = el.style.filter;
    }
  });
}