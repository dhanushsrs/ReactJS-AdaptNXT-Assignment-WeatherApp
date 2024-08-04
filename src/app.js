require("dotenv").config();

const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const getWeatherData = require("../utils/weatherData");

const publicPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");
const viewsPath = path.join(__dirname, "../templates/views");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.render("index", { title: "Weather App" });
});

app.get("/weather", async (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.status(400).send("Address is required");
  }

  try {
    const data = await getWeatherData(address);
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
    // console.log(error.message)
  }
});

app.get("*", (req, res) => {
  res.render("404", { title: "Page Not Found" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


