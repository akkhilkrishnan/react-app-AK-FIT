const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { ObjectId } = require("mongodb");
const whatsappClient = require("./whatsapp"); // Adjust the path if needed

mongoose
  .connect("mongodb+srv://Akkhil:Akkhil09@cluster0.oeyly.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the WhatsApp client
whatsappClient.initialize();

const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://Akkhil:Akkhil09@cluster0.oeyly.mongodb.net/"
);
// const connectDB=async ()=>{
//   mongoose.connect('mongodb+srv://akkhilcoder:akdb123@cluster0.1bzifad.mongodb.net/test');
//   const productSchema=new mongoose.Schema({});
//   const product=mongoose.modal('members', productSchema)
var data, sortedData;
async function run() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("members").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    data = await client.db("GritDB").collection("Members").find().toArray();

    sortedData = await data.sort((a, b) => {
      // Check if membershipStart exists and is a string
      if (!a.joiningDate || typeof a.joiningDate !== "string") {
        return 1; // Move undefined or non-string values to the end
      }
      if (!b.joiningDate || typeof b.joiningDate !== "string") {
        return -1; // Move undefined or non-string values to the end
      }

      const aDateParts = a.joiningDate.split("-"); // Split by '-'
      const bDateParts = b.joiningDate.split("-");

      // Create Date objects from the parts (YYYY-MM-DD)
      const aDate = new Date(
        `${aDateParts[2]}-${aDateParts[1]}-${aDateParts[0]}`
      );
      const bDate = new Date(
        `${bDateParts[2]}-${bDateParts[1]}-${bDateParts[0]}`
      );

      return bDate - aDate; // Sort in Descending order
    });
  } catch (error) {
    console.log(error);
  }
}
var memberDetails;
const parseDate = (date) => {
  const dateParts = date.split("/");
  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  return formattedDate;
};
const fetchMemberDetails = async (id) => {
  try {
    await client.connect();
    memberDetails = await client
      .db("GritDB")
      .collection("Members")
      .find({ _id: new ObjectId(id) });
    // await client.close();
  } catch (error) {
    console.log(error);
  }
};

app.get("/fetchMemberDetails", (req, res) => {
  fetchMemberDetails().catch(console.dir);
  res.send(data);
});

app.get("/data", (req, res) => {
  run().catch(console.dir);
  res.send(sortedData);
});
app.post("/addmember", async (req, res) => {
  var postStatus;
  postStatus = await insertMember(req.body);
  res.send({ status: postStatus ? "Success" : "failure" });
});

app.post("/api/memberdetail", async (req, res) => {
  try {
    console.log("resposeeeeee", req.body);
    const messageData = req.body;
    addTrialMember(messageData);
    // res.status(201).send({ message: "Message stored successfully!" });
  } catch (error) {
    console.error("Error saving message:", error);
    // res.status(500).send({ error: "Failed to store message" });
  }
});
const addTrialMember = async (member) => {
  console.log(member);
  var postStatus;
  postStatus = await insertMember(member);
  console.log("\n \ninsert status::::::", postStatus);
};

async function insertMember(member) {
  var postStatus;
  try {
    await client.connect();
    const existingMember = await client
      .db("GritDB")
      .collection("Members")
      .findOne({
        name: member.name,
        dateofbirth: member.dateofbirth,
      });
    if (!existingMember) {
      let result = await client
        .db("GritDB")
        .collection("Members")
        .insertOne(member);
      result.acknowledged
        ? console.log("member inserted in DB successfuly")
        : console.log("something went wrong");
      postStatus = result.acknowledged;
    } else {
      console.log(
        "Insert skipped: Member already existing Duplicate entry for name and DOB:",
        member.name,
        member.dateofbirth
      );
    }
  } catch (error) {
    console.log(error);
  }
  return postStatus;
}

app.listen(5000, () => {
  console.log(`Server is running on port: ${5000}`);
});
