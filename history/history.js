"use strict";
export async function uploadJSON(filePath, collectionName) {
  const db = client.db();
  const collection = db.collection(collectionName);

  try {
    const jsonData = await fs.promises.readFile(filePath, "utf8");
    const data = JSON.parse(jsonData);
    await collection.insertOne(data);
    console.log("Uploaded JSON data to collection:", collectionName);
  } catch (error) {
    console.error("Error uploading JSON:", error);
  } finally {
    await client.close();
  }
}

const filePath = "./history/data/hanoi 2024-06-19 to 2024-06-25.json";
const collectionName = "history";
