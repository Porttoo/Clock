/**
 * Dynamically positions the analog clock numbers around the dial.
 * t is based on the width/height of the `.clock` container and distributes the numbers in a circle.
 */
export function numberPosition() {
  const clock = document.querySelector(".clock");
  const numbers = document.querySelectorAll(".number");
  // Clock center
  const centerX = clock.offsetWidth / 2;
  const centerY = clock.offsetHeight / 2;
  // Distance from center to numbers (adjust according to clock size)
  const radius = clock.offsetWidth / 2 - 20;

  numbers.forEach((el, index) => {
    // Rotates 30 degrees per number, starting at -60° (number 12 position)
    const angleInRadians = (index - 2) * 30 * (Math.PI / 180);
    // Calculates circular coordinates
    const x = centerX + radius * Math.cos(angleInRadians);
    const y = centerY + radius * Math.sin(angleInRadians);

    // Position each number at the calculated point
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  });
}
