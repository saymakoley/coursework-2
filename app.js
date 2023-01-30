const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

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

connectToDB().then(() => {
  app.listen(process.env.PORT || 3000, () =>
    console.log(`server is listening: ${process.env.PORT || 3000}`)
  );
});
