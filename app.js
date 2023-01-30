const { MongoClient, ServerApiVersion } = require("mongodb")

let mongoDB;

const uri =
  "mongodb+srv://Sayma:lkC4hLUH46poTdId@web-coursework-2.vjqikya.mongodb.net/?retryWrites=true&w=majority";

const connectToDB = async function () {
    mongoDB = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });
};

const getDB = function () {
  
  return mongoDB.db("sayma-coursework");
};

module.exports = { connectToDB, getDB };
