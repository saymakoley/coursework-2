const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { ObjectId } = require("mongodb");
const parser = require("body-parser");

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

app.get("/lessons", async (req, res, next) => {
  try {
    const term = req.query.search || "";
    const query = term
      ? {
          $or: [
            { subject: { $regex: term, $options: "i" } },
            { location: { $regex: term, $options: "i" } },
          ],
        }
      : {};

    const database = await getDB();
    const lessons = database.collection("lessons");
    const lessonsData = await lessons.find(query).toArray();

    res.send(lessonsData);
  } catch (error) {
    next(error);
  }
});

app.post("/orders", async (req, res, next) => {
  try {
    const orderInfo = req.body;
    const database = await getDB();
    const ordersCollection = database.collection("orders");
    const newOrder = await ordersCollection.insertOne(orderInfo);

    res.send(newOrder);
  } catch (error) {
    next(error);
  }
});

app.put("/lessons/:id", async (req, res) => {
  const id = req.params.id;
  const spacesToDecrement = req.body.spaces;

  const db = await getDB();
  const lessonsCollection = db.collection("lessons");
  try {
    await lessonsCollection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $inc: { spaces: -spacesToDecrement } }
    );
  } catch (error) {
    console.error("Error in updating lesson spaces:", error);
  }

  res.send("Lesson spaces updated successfully");
});
