const { MongoClient, ServerApiVersion } = require("mongodb")

let mongoDB;

const uri =
  "mongodb+srv://Sayma:lkC4hLUH46poTdId@web-coursework-2.vjqikya.mongodb.net/?retryWrites=true&w=majority";

const connectToDB = async function () {
  try {
    mongoDB = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
    console.log("Successfully connected to MongoDB Atlas");
  } catch (error) {
    console.log("Failed to connect to MongoDB Atlas: ", error);
    throw error;
  }
};

const getDB = function () {
  if (!mongoDB) {
    console.log("Connection Error");
  }
  return mongoDB.db("sayma-coursework");
};

module.exports = { connectToDB, getDB };
