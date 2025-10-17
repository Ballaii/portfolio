<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { getWeatherByLocation } from "./geo";
import { applyWeatherAnimation } from "./animations";

const city = ref("");
const weather = ref(null);
const loading = ref(false);
const error = ref("");

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = async () => {
  if (!city.value.trim()) {
    error.value = "Please enter a city name.";
    return;
  }

  loading.value = true;
  error.value = "";
  weather.value = null;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
    const { data } = await axios.get(url);
    weather.value = data;
    applyWeatherAnimation(data.weather[0].main);
  } catch (err) {
    error.value = "City not found or network error.";
  } finally {
    loading.value = false;
  }
};

// Auto detect weather on load
onMounted(async () => {
  try {
    loading.value = true;
    const data = await getWeatherByLocation(apiKey);
    weather.value = data;
    applyWeatherAnimation(data.weather[0].main);
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
});

const weatherIcon = computed(() => {
  if (!weather.value) return "";
  const icon = weather.value.weather[0].icon;
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
});
</script>

<template>
  <div class="app-container">
    <div class="card">
      <h1>🌦️ Weather App</h1>

      <input type="text" v-model="city" placeholder="Enter city name" @keyup.enter="getWeather" />
      <button @click="getWeather">Get Weather</button>

      <div v-if="loading" class="loader"></div>
      <p v-if="error" class="error">{{ error }}</p>

      <div v-if="weather && !loading" class="weather-info">
        <h2>{{ weather.name }}, {{ weather.sys.country }}</h2>
        <img :src="weatherIcon" alt="Weather Icon" />
        <p class="condition">{{ weather.weather[0].description }}</p>
        <p class="temp">{{ weather.main.temp.toFixed(1) }}°C</p>

        <div class="details">
          <p>Feels like: {{ weather.main.feels_like.toFixed(1) }}°C</p>
          <p>Humidity: {{ weather.main.humidity }}%</p>
          <p>Pressure: {{ weather.main.pressure }} hPa</p>
          <p>Wind: {{ weather.wind.speed.toFixed(1) }} m/s</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Centered backdrop */
.app-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 1s ease;
}

/* Frosted glass card */
.card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  padding: 30px 40px;
  text-align: center;
  color: white;
  width: 360px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
}

/* Input and button */
input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
  outline: none;
}

button {
  margin-top: 15px;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}
button:hover {
  background-color: #2980b9;
}

/* Loader */
.loader {
  margin: 20px auto;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error */
.error {
  color: #ffbaba;
  background: rgba(255, 0, 0, 0.25);
  border-radius: 6px;
  padding: 8px;
  margin-top: 15px;
}

/* Weather info */
.weather-info {
  margin-top: 20px;
  animation: fadeIn 1s ease;
}
.condition {
  text-transform: capitalize;
  font-size: 18px;
}
.temp {
  font-size: 36px;
  font-weight: bold;
  margin-top: 8px;
}
.details {
  margin-top: 10px;
  font-size: 15px;
  line-height: 1.6;
  color: #e6e6e6;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Weather-based background animations */
:global(body) {
  transition: background 1s ease, filter 1s ease;
}

/* SUNNY */
:global(body.sunny) {
  background: linear-gradient(to bottom, #f9d423, #ff4e50);
}

/* CLOUDY */
:global(body.cloudy) {
  background: linear-gradient(to bottom, #bdc3c7, #2c3e50);
  background-size: 200% 200%;
  animation: floatClouds 15s ease-in-out infinite alternate;
}
@keyframes floatClouds {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}

/* RAINY */
:global(body.rainy) {
  background: linear-gradient(to bottom, #4b79a1, #283e51);
  animation: rainMove 1.5s linear infinite;
}
@keyframes rainMove {
  0% { filter: brightness(1); }
  100% { filter: brightness(0.85); }
}

/* THUNDER */
:global(body.thunder) {
  background: #1a1a1a;
  animation: thunderFlash 4s infinite;
}
@keyframes thunderFlash {
  0%, 90%, 100% { background-color: #1a1a1a; }
  95% { background-color: #f5e600; }
}

/* NIGHT */
:global(body.night) {
  background: linear-gradient(to bottom, #000428, #004e92);
  color: #dcdcdc;
}
</style>
