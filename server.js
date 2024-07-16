const express = require('express');
const app = express();
const HOST = 'localhost';
const PORT = 3000;
const path = require('path');
const ejs = require('ejs');
const staticPath = path.join(__dirname, 'public');
const { connectToMongo, getData, updateData } = require('./history.js');

connectToMongo();

app.set('view engine', 'ejs');

app.use(express.static(staticPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'start.html'));
});
app.get('/realtime', (req, res) => {
  res.sendFile(path.join(staticPath, 'realtime.html'));
});
app.get('/forecast', (req, res) => {
  res.sendFile(path.join(staticPath, 'forecast.html'));
});
app.get('/history', async (req, res) => {
  try {
    //Get data from Mongo
    const data = await getData('history');
    console.log(data);
    //Destructuring
    const { latitude, name } = data[0];
    //Render to frontend
    res.render(__dirname + '/public/views/history', { latitude, name });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).send('Error retrieving weather data');
  }
});
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server Running at port ${PORT}!`)
);
