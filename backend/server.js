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


const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient('mongodb+srv://akkhilcoder:akdb123@cluster0.1bzifad.mongodb.net/test')
var data;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("members").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
     data=await client.db('Members').collection('Members').find().toArray()
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/data", (req,res)=>{
  
  res.send(data);
})
app.post("/data",(req,res)=>{
// res.send({"name":"Krishna","DOB":"05-jul-1995","DOJ":"1-mar-2023","package":"quarterly","amountpaid":8000})
let data = req.body;
run().catch(console.dir);
let memberDetails={
  name:data.name,
  DOB:data.dob,
  DOJ:data.joiningdate,
  package:data.subscription,
  amountpaid:data.amountpaid,
  instaid:data.insta?data.insta:'',
  phnnumber:data.phnnumber?data.phnnumber:'',
  email:data.email?data.email:'',

}
client.db('Members').collection('Members').insertOne(memberDetails,(err,info)=>{
  res.send(info)
})
})
app.listen(5000, () => {
  // perform a database connection when server starts

  console.log(`Server is running on port: ${5000}`);
});


