const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://universeITmaster:BeAfAku5WAqfVuc5@cluster1.olinusx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbInstance = null;

async function connectDB() {
  dbInstance = client.db("UNIVERSE_IT");
}

function getCollection(collectionName) {
  if (!dbInstance) {
    dbInstance = client.db("UNIVERSE_IT");
  }
  return dbInstance.collection(collectionName);
}

module.exports = { connectDB, getCollection };