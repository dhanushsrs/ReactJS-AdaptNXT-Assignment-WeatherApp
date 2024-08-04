const axios = require("axios");

const openWeatherMap = {
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather",
  API_KEY: process.env.API_KEY,
};

const getWeatherData = async (address) => {
  try {
    const url = `${openWeatherMap.BASE_URL}?q=${encodeURIComponent(
      address
    )}&appid=${openWeatherMap.API_KEY}`;

    // console.log(`Request URL: ${url}`);

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching data: ${error.response?.data?.message || error.message}`
    );
    throw new Error("Unable to fetch data. Please try again later.");
  }
};

module.exports = getWeatherData;
