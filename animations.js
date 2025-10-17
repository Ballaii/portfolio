// animations.js
export function applyWeatherAnimation(condition) {
  const body = document.body;
  body.className = ""; // clear previous class

  const normalized = condition.toLowerCase();

  if (normalized.includes("cloud")) {
    body.classList.add("cloudy");
  } else if (normalized.includes("rain")) {
    body.classList.add("rainy");
  } else if (normalized.includes("thunder") || normalized.includes("storm")) {
    body.classList.add("thunder");
  } else if (normalized.includes("clear")) {
    body.classList.add("sunny");
  } else if (normalized.includes("night")) {
    body.classList.add("night");
  } else {
    // default fallback
    body.classList.add("sunny");
  }
}
