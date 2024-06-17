const express = require("express");
const app = express();
const axios = require("axios");

app.get("/", (req, res) => {
  res.send("API is working");
});

app.get("/flights", async (req, res) => {
  try {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "google_flights",
        departure_id: "IXE",
        arrival_id: "BLR",
        outbound_date: "2024-06-20",
        return_date: "2024-06-24",
        currency: "INR",
        hl: "en",
        api_key:
          "6700939c5f01b59f217b907b0ad519ab96796e5cca998e789c5d3332342506da",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
