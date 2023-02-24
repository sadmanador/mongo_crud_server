const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middleware
app.use(cors());
app.use(express.json());

//mongo connection

const uri =
  "mongodb+srv://user02:WDDnKhnB4PHMXwdC@cluster0.9mathic.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const userCollection = client
      .db("simple-node-mongo-server")
      .collection("mongo_crud_server");

    //post user data from inputField
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    //read method
    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    //delete method
    app.delete('/users/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const result = await userCollection.deleteOne(query);
      res.send(result)
    })
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`listening port 5000`);
});
