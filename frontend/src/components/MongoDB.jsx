const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb+srv://whyufeng:p2nERJSSTennBzl7@clusterny0.gryw4wv.mongodb.net/";

// Create a new MongoClient
const client = new MongoClient(uri);

// Async function to wrap your MongoDB operations
async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Specify the database and collection
    const database = client.db("nyApp");
    const collection = database.collection("okx_market_data");

    // Define filter and projection
    const filter = {};
    const projection = {
      instId: 1,
      _id: 0,
    };

    // Query the collection
    const cursor = collection.find(filter, { projection });

    // Array to store results
    const result = [];

    // Iterate over the cursor and extract values
    await cursor.forEach((doc) => {
      result.push(doc.instId); // Assuming 'high24h' is the field whose values you want
    });

    // Convert array to string
    const resultString = JSON.stringify(result);

    // Save the string to localStorage

    console.log(resultString);
  } finally {
    // Close the client when finished
    await client.close();
  }
}

// Call the async function
run().catch(console.error);
