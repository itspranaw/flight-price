import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [flights, setFlights] = useState([]);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/flights', {
        params: { origin, destination, date, return_date: returnDate },
      });
      setFlights(response.data.flights || []);
    } catch (error) {
      console.error('Error fetching flight data', error);
    }
  };

  return (
    <div className="App">
      <h1>Find Cheapest Flights</h1>
      <input
        type="text"
        placeholder="Origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="Return Date (Optional)"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
      />
      <button onClick={fetchFlights}>Search Flights</button>

      <div>
        {flights.length > 0 ? (
          <ul>
            {flights.map((flight, index) => (
              <li key={index}>
                <div>
                  <h3>Flight {index + 1}</h3>
                  <p><strong>Departure:</strong> {flight.departure_airport.name} ({flight.departure_airport.id}) at {flight.departure_airport.time}</p>
                  <p><strong>Arrival:</strong> {flight.arrival_airport.name} ({flight.arrival_airport.id}) at {flight.arrival_airport.time}</p>
                  <p><strong>Duration:</strong> {flight.duration} minutes</p>
                  <p><strong>Airplane:</strong> {flight.airplane}</p>
                  <p><strong>Airline:</strong> {flight.airline} <img src={flight.airline_logo} alt="Airline logo" /></p>
                  <p><strong>Class:</strong> {flight.travel_class}</p>
                  <p><strong>Flight Number:</strong> {flight.flight_number}</p>
                  {flight.legroom && <p><strong>Legroom:</strong> {flight.legroom}</p>}
                  <p><strong>Extensions:</strong></p>
                  <ul>
                    {flight.extensions.map((extension, extIndex) => (
                      <li key={extIndex}>{extension}</li>
                    ))}
                  </ul>
                  {flight.often_delayed_by_over_30_min && <p style={{ color: 'red' }}><strong>Often delayed by over 30 minutes</strong></p>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No flights found</p>
        )}
      </div>
    </div>
  );
}

export default App;
