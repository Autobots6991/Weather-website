const express = require('express');
const app = express();
const HOST = 'localhost';
const PORT = 3000;
const path = require('path');
const staticPath = path.join(__dirname, 'public');
const { connectToMongo } = require('./public/data/history.js');
app.use(express.static(staticPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'start.html'));
});
app.get('/realtime', (req, res) => {
  res.sendFile(path.join(staticPath, 'realtime.html'));
});
app.get('/history', async (req, res) => {
  connectToMongo();
  res.sendFile(path.join(staticPath, 'history.html'));
});
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server Running at port ${PORT}!`)
);
