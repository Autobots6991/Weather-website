// Import necessary modules
const express = require('express');
const app = express();
const HOST = 'localhost';
const PORT = 3000;
const path = require('path');
const ejs = require('ejs');
const staticPath = path.join(__dirname, 'public');
// Import functions from history.js
const { connectToMongo, getData, updateData } = require('./history.js');

// Connect to MongoDB
connectToMongo();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(staticPath));

// Define routes
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

app.get('/history', async (req, res) => {
  try {
    // Fetch weather data from MongoDB using the 'getData' function
    const data = await getData('history');
    console.log(data);

    // Destructure the latitude and name properties from the first object in the data array
    const { latitude, name } = data[0];

    // Render the 'history.ejs' template with the destructured properties
    res.render(__dirname + '/public/views/history', { latitude, name });
  } catch (error) {
    // Log any errors that occur during data fetching
    console.error('Error fetching weather data:', error);

    // Send a 500 status code and an error message if an error occurs
    res.status(500).send('Error retrieving weather data');
  }
});

// Start the server on the specified port
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server Running at port ${PORT}!`)
);
