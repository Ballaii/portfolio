// api.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const { data } = await axios.get(url);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
