const uri = 'mongodb://localhost:27017/';
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri);
async function connectToMongo() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit on error
  }
}
async function getData(collectionName) {
  const db = client.db('weather');
  const collection = db.collection(collectionName);

  try {
    const cursor = collection.find({}); // Find all documents (replace with filters if needed)
    const data = await cursor.toArray();
    return data;
  } catch (error) {
    console.error('Error extracting data:', error);
    return []; // Return empty array on error
  }
}
async function updateData() {
  const collectionName = 'history';
  const data = await getData(collectionName);
  const { latitude } = data[0];
  console.log(latitude);
  $('.weather__city').html(latitude);
}

$(document).ready(updateData());

module.exports = { connectToMongo };
