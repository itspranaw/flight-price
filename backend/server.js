const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { getJson } = require('serpapi');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());

// Add CSP settings
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "font-src": ["'self'", "data:"],
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:"]
  }
}));

const serpApiKey = '6700939c5f01b59f217b907b0ad519ab96796e5cca998e789c5d3332342506da';

app.get('/api/flights', async (req, res) => {
  const { origin, destination, date, return_date } = req.query;
  console.log(`Received request with origin: ${origin}, destination: ${destination}, date: ${date}`);

  if (!origin || !destination || !date) {
    return res.status(400).send('Missing required parameters');
  }

  const params = {
    api_key: serpApiKey,
    engine: "google_flights",
    hl: "en",
    gl: "in",
    departure_id: origin,
    arrival_id: destination,
    outbound_date: date,
    return_date: return_date || '', // Optional
    currency: "INR"
  };

  try {
    await new Promise((resolve, reject) => {
      getJson(params, (json) => {
        if (json.error) {
          return reject(json.error);
        }
        res.json(json);
        resolve();
      });
    });
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).send('Error fetching flight data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
