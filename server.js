"use strict";
const express = require("express");
const fs = require("fs");
const app = express();
const HOST = "localhost";
const PORT = 3000;
const path = require("path");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://test:test1234@cluster0.51oirtq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
const filePath = "./history/data/hanoi 2024-06-19 to 2024-06-25.json";
const collectionName = "history";
const uploadJSON = require("./history/history");
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
app.use("/", express.static(path.join(__dirname + "/start")));
app.use("/home", express.static(path.join(__dirname + "/start")));
app.use("/realtime", express.static(path.join(__dirname + "/realtime")));
app.use("/history", express.static(path.join(__dirname + "/history")));
connectToMongo().then((result) =>
  app.listen(process.env.PORT || 3000, () =>
    console.log(`Server Running at port ${PORT}! and connected to DB`)
  )
);

uploadJSON(filePath, collectionName);
