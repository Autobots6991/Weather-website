// Import required MongoDB client and utilities
const uri = 'mongodb://localhost:27017/';
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri);

// Function to connect to MongoDB
async function connectToMongo() {
  try {
    // Connect to MongoDB server
    await client.connect();
    // Ping the server to verify connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } catch (error) {
    // Log error if connection fails
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit on error
  }
}

// Function to fetch data from MongoDB collection
async function getData(collectionName) {
  // Access the 'weather' database
  const db = client.db('weather');
  // Access the specified collection
  const collection = db.collection(collectionName);

  try {
    // Find all documents in the collection (replace with filters if needed)
    const cursor = collection.find({});
    // Convert the cursor to an array of documents
    const data = await cursor.toArray();
    return data;
  } catch (error) {
    // Log error if data extraction fails
    console.error('Error extracting data:', error);
    return []; // Return empty array on error
  }
}

async function processWeatherData() {
  // Fetch weather data from MongoDB using the 'getData' function
  const data = await getData('history');

  // Destructure properties from the first object in the data array
  const { latitude, name, days } = data[0];
  const uppercaseName = name.toUpperCase();

  // Destructure properties from the 'days' array and calculate averages for each property
  const { feelslike, datetime, temp } = days.reduce(
    (acc, day) => {
      acc.feelslike.push(day.feelslike);
      acc.datetime.push(day.datetime);
      acc.temp.push(day.temp);
      return acc;
    },
    { feelslike: [], datetime: [], temp: [] }
  );
  // Return processed data
  return {
    latitude,
    name: uppercaseName,
    datetime,
    feelslike,
    temp,
  };
}

// Export the functions for use in other parts of the application
module.exports = { connectToMongo, getData, processWeatherData };
