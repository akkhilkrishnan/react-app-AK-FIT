// const express = require("express");
// const app = express();

// require("dotenv").config({ path: "./config.env" });
// const port = process.env.PORT || 5000;

// app.use(express.json());
// // app.use(require("./routes/record"));
// // get driver connection
// const dbo = require("./db/conn");

// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);

//   });
//   console.log(`Server is running on port: ${port}`);
// });

// import { ObjectId } from "bson"
const express = require("express");
const cors = require("cors");
const app = express();
const { ObjectId } = require('mongodb');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());
const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient('mongodb+srv://akkhilcoder:akdb123@cluster0.1bzifad.mongodb.net/test')
// const connectDB=async ()=>{
//   mongoose.connect('mongodb+srv://akkhilcoder:akdb123@cluster0.1bzifad.mongodb.net/test');
//   const productSchema=new mongoose.Schema({});
//   const product=mongoose.modal('members', productSchema)
var data;
async function run() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("members").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    data = await client.db('Members').collection('Members').find().toArray()
  } finally {
    await client.close();
  }
}
var memberDetails;

const fetchMemberDetails = async (id) => {
  try {
    await client.connect();
    memberDetails = await client.db('Members').collection('Members').find({_id:new ObjectId(id)})
    await client.close();
  }
  finally {
    await client.close();
  }
  // console.log('member details::::::', memberDetails)
}
//64bc19c5f6f36df9fc6439ef

app.get("/fetchMemberDetails", (req, res) => {
  fetchMemberDetails().catch(console.dir);
  res.send(data);
})

app.get("/data", (req, res) => {
  run().catch(console.dir);
  res.send(data);
})
app.post("/addmember", async (req, res) => {
  var postStatus
  postStatus = await insertMember(req.body)
  res.send({ status: postStatus ? 'Success' : 'failure' })
})

async function insertMember(record) {
  var postStatus
  try {
    await client.connect();
    let result = await client.db('Members').collection('Members').insertOne(record)
    console.log('result:::', result)
    postStatus = result.acknowledged
  }
  // catch {
  //   console.dir('catcheddd')
  // }
  finally {
    await client.close();
  }
  return postStatus
}

app.listen(5000, () => {
  console.log(`Server is running on port: ${5000}`);
});