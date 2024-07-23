// Import necessary modules
const express = require('express');
const app = express();
const HOST = 'localhost';
const { PORT } = require('./config.js');
const path = require('path');
const ejs = require('ejs');
const staticPath = path.join(__dirname, 'public');

// Import functions from history.js
const { connectToMongo, processWeatherData } = require('./src/history.js');

// Connect to MongoDB
connectToMongo();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(staticPath));

app.use(require('./routes/auth.js'));

app.use(require('./routes/models.js'));
app.get('/', (req, res) => {
  // Send the 'start.html' file when the root route is accessed
  res.sendFile(path.join(staticPath, 'start.html'));
});

app.get('/realtime', (req, res) => {
  // Send the 'realtime.html' file when the '/realtime' route is accessed
  res.sendFile(path.join(staticPath, 'realtime.html'));
});

app.get('/forecast', (req, res) => {
  // Send the 'forecast.html' file when the '/forecast' route is accessed
  res.sendFile(path.join(staticPath, 'forecast.html'));
});
// Register a new user
app.get('/history', async (req, res) => {
  try {
    const { latitude, name, datetime, feelslike, temp } =
      await processWeatherData();

    // Render the 'history.ejs' template with the fetched data
    res.render(__dirname + '/views/history', {
      latitude,
      name,
      datetime,
      feelslike,
      temp,
    });
  } catch (error) {
    // Log any errors that occur during data fetching
    console.error('Error fetching weather data:', error);

    // Send a 500 status code and an error message if an error occurs
    res.status(500).send('Error retrieving weather data');
  }
});

// Start the server on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}...`);
});
