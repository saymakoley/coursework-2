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

// set up CORS header middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// request logger middleware
app.use((req, res, next) => {
  console.log({
    method: req.method,
    path: req.url,
    status: res.statusCode,
  });
  next();
});

// images middleware
app.use(express.static("public"));

connectToDB().then(() => {
  app.listen(process.env.PORT || 3000, () =>
    console.log(`server is listening: ${process.env.PORT || 3000}`)
  );
});
