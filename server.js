'use strict';
const express = require('express');
const app = express();
const HOST = 'localhost';
const PORT = 3000;
const path = require('path');
const { MongoClient } = require('mongodb');
const uri =
  'mongodb+srv://test:test1234@cluster0.51oirtq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);
async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
app.use('/', express.static(path.join(__dirname + '/start')));
app.use('/home', express.static(path.join(__dirname + '/start')));
app.use('/realtime', express.static(path.join(__dirname + '/realtime')));
connectToMongo();
async function getData(collectionName) {
  const db = client.db();
  const collection = db.collection(collectionName);

  try {
    const cursor = collection.find({});
    const data = await cursor.toArray();
    return data;
  } catch (error) {
    console.error('Error extracting data:', error);
    return [];
  }
}

app.get('/history', async (req, res) => {
  const collectionName = 'history';
  const data = await getData(collectionName);

  res.render('./index.html', { data });
});
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server Running at port ${PORT}! and connected to DB`)
);
