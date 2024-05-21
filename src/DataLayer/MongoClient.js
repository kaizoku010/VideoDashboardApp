const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://dev:<j0BOBWvPdNy3XW3a>@schoolcluster.vte6gnc.mongodb.net/?retryWrites=true&w=majority&appName=schoolCluster&ssl=true';
// const uri = "mongodb://atlas-sql-6364ec82b0ad221f6390815e-1oyjt.a.query.mongodb.net/myVirtualDatabase?ssl=true&authSource=admin";

MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 30000 // Increase timeout to 30 seconds (default is 10000ms)
  });

// Create a new MongoClient
const client = new MongoClient(uri);
// Connect to the MongoDB server
async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("ads").command({ ping: 1 });
      } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally{
    await client.close();
  }
}

connectToDatabase();
