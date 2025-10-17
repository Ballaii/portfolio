// geo.js
import axios from "axios";

export async function getWeatherByLocation(apiKey) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        try {
          const { data } = await axios.get(url);
          resolve(data);
        } catch (err) {
          reject("Error fetching weather by location.");
        }
      },
      async () => {
        // fallback via IP geolocation if user denies
        try {
          const ipData = await axios.get("https://ipapi.co/json/");
          const { latitude, longitude } = ipData.data;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
          const { data } = await axios.get(url);
          resolve(data);
        } catch (err) {
          reject("Unable to get location automatically.");
        }
      }
    );
  });
}
