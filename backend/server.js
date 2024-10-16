const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { ObjectId } = require("mongodb");
const whatsappClient = require("./whatsapp"); // Adjust the path if needed
const updateUser = require("./updateQuery");
//connecting to MongoDB client
mongoose
  .connect("mongodb+srv://Akkhil:Akkhil09@cluster0.oeyly.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    fetchfullData().then((fulldata) => getIds(fulldata));
    // fetchfullData().then((fulldata) => updateUser(fulldata, client));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://Akkhil:Akkhil09@cluster0.oeyly.mongodb.net/"
);
var data,
  sortedData,
  memberIds = [],
  memberDetails,
  maxId;

const getIds = (members) => {
  console.log(members.length);
  members.map((member) => {
    if (member.member_id)
      !memberIds.includes(member.member_id) &&
        memberIds.push(member.member_id.replace("KP", ""));
  });

  maxId = Math.max(
    ...memberIds.map((id) => parseInt(id.replace("KP", ""), 10))
  );
  console.log(maxId);

  // insertdatatoMembers(maxId);
};

const insertdatatoMembers = async (maxId) => {
  await client.connect();
  do {
    const paddedId = String(maxId).padStart(4, "0");

    const existingMember = await client
      .db("GritDB")
      .collection("MemberSubscriptions")
      .findOne({
        member_id: "KP" + paddedId,
      });
    existingMember && console.log(existingMember.name);
    let result;
    if (existingMember) {
      result = await client
        .db("GritDB")
        .collection("Members")
        .insertOne(existingMember);
    }
    console.log(result);
    maxId = maxId - 1;
  } while (maxId >= 1);
};
const fetchfullData = async () => {
  var fulldata;
  try {
    fulldata = await client
      .db("GritDB")
      .collection("MemberSubscriptions")
      .find()
      .toArray();
  } catch (error) {
    console.log(error);
  }
  return fulldata;
};
const sortData = (data) => {
  sortedData = data.sort((a, b) => {
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
};
async function fetchData(limit, offset, allFlag) {
  try {
    console.log(allFlag);
    if (allFlag == "all") {
      data = await client
        .db("GritDB")
        .collection("MemberSubscriptions")
        .find()
        .sort({ joiningDate: -1 })
        .toArray();
    } else {
      data = await client
        .db("GritDB")
        .collection("MemberSubscriptions")
        .find()
        .sort({ joiningDate: -1 })
        .skip(offset)
        .limit(limit)
        .toArray();
    }
  } catch (error) {
    console.log(error);
  }
  return data;
}

async function insertMember(member) {
  var postStatus;
  try {
    await client.connect();

    const existingMember = await client
      .db("GritDB")
      .collection("MemberSubscriptions")
      .findOne({
        name: member.name,
        dateofbirth: member.dateofbirth,
      });
    if (!existingMember) {
      member.member_id = "KP" + (maxId + 1);
      maxId = maxId + 1;
      let result = await client
        .db("GritDB")
        .collection("MemberSubscriptions")
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
      .collection("MemberSubscriptions")
      .find({ _id: new ObjectId(id) });
    // await client.close();
  } catch (error) {
    console.log(error);
  }
};
const generateNewId = () => {};
// const updateUser = async () => {
//   try {
//     console.log(data[1]);
//     for (const member of data) {
//       // if (member.membershipend) {
//       //   // Ensure membershipend is a valid date string
//       //   const dateParts = member.membershipend.split("-");
//       //   if (dateParts.length === 3) {
//       //     const [dayStr, monthStr, yearStr] = dateParts;
//       //     const day = Number(dayStr);
//       //     const month = Number(monthStr);
//       //     const year = Number(yearStr);
//       //     const parsedExpiryDate = new Date(year, month - 1, day); // Month is 0-indexed
//       //     console.log(`Parsed date for ${member.name}: ${parsedExpiryDate}`);
//       //     if (
//       //       parsedExpiryDate.getDate() === day &&
//       //       parsedExpiryDate.getMonth() === month - 1 &&
//       //       parsedExpiryDate.getFullYear() === year
//       //     ) {
//       //       const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
//       //       const diffDays = Math.round(
//       //         Math.abs((parsedExpiryDate - new Date()) / oneDay)
//       //       );
//       //       let memberStatus = "";
//       //       if (parsedExpiryDate <= new Date()) {
//       //         memberStatus = "Expired";
//       //       } else if (diffDays <= 3) {
//       //         memberStatus = "Expiring soon";
//       //       } else {
//       //         memberStatus = "Ongoing";
//       //       }
//       //       // Update the member status in the database
//       //       const result = await client
//       //         .db("GritDB")
//       //         .collection("MemberSubscriptions")
//       //         .updateMany(
//       //           { _id: member._id }, // Filter criteria
//       //           { $set: { status: memberStatus } }, // Update data
//       //           { new: true } // Return the updated document
//       //         );
//       //       console.log(`Updated member ${member.name}:`, result);
//       //     } else {
//       //       console.warn(
//       //         `Invalid date for member ${member.name}: ${member.membershipend}`
//       //       );
//       //     }
//       //   } else {
//       //     console.warn(
//       //       `Invalid date format for member ${member.name}: ${member.membershipend}`
//       //     );
//       //   }
//       // } else {
//       //   console.warn(`No membership end date for member ${member.name}`);
//       // }
//       // if (member.membershipend && member._id) {
//       //   // Ensure joiningDate and _id exist
//       //   const [day, month, year] = member.membershipstart.split("-").map(Number);
//       //   const dateObject = new Date(year, month - 1, day); // Convert to Date object
//       //   const result = await client
//       //     .db("GritDB")
//       //     .collection("MemberSubscriptions")
//       //     .findOneAndUpdate(
//       //       { _id: member._id }, // Use the _id for filtering
//       //       { $set: { membershipstart: dateObject } }, // Update the joiningDate field
//       //       { returnDocument: "after" } // Return the updated document
//       //     );
//       //   console.log(`Updated member with ID ${member._id}:`, result);
//       // } else {
//       //   console.warn(`Missing joining date or _id for member:`, member);
//       // }
//     }
//   } catch (error) {
//     console.error("Error updating member:", error);
//   }

//   //   console.log("Updated Users");
//   // } catch (error) {
//   //   console.error("Error updating user:", error);
//   // }
// };

app.get("/fetchMemberDetails", (req, res) => {
  const id = req.query.id; // Extract id from query parameters
  fetchMemberDetails(id).catch(console.dir);
  res.send(data);
});

app.get("/data", async (req, res) => {
  res.set("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
  res.set("Pragma", "no-cache"); // HTTP 1.0
  res.set("Expires", "0"); // Proxies

  const limit = parseInt(req.query.limit) || 10; // Default to 10 if not provided
  const skip = parseInt(req.query.skip) || 0; // Default to 0 if not provided
  const allFlag = req.query.flag || ""; // Default to 0 if not provided

  // Fetch data from database
  await fetchData(limit, skip, allFlag)
    .then(() => {
      res.send(data);
    })
    .catch(console.dir);
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

app.post("/api/memberpayment", async (req, res) => {
  try {
    console.log("\n\nresposeof payment::::::", req.body);
    const messageData = req.body;
    updateMemberPayment(messageData);
    // res.status(201).send({ message: "Message stored successfully!" });
  } catch (error) {
    console.error("Error saving message:", error);
    // res.status(500).send({ error: "Failed to store message" });
  }
});

const updateMemberPayment = async (member) => {
  console.log("member before update::::", member);
  const {
    name,
    phone,
    membershipstart,
    membership,
    totalPaid,
    joiningDate,
    membershipend,
    lastpaymentmode,
    lastpaymentdate,
  } = member;

  const updateFields = {
    $set: {
      membershipstart: membershipstart,
      membership: membership,
      totalPaid: totalPaid,
      joiningDate: new Date(joiningDate),
      status: "Pending Approval",
      membershipend: membershipend,
      lastpaymentmode: lastpaymentmode,
      lastpaymentdate: lastpaymentdate,
    },
  };
  console.log("phone::::", name, phone);
  try {
    const result = await client
      .db("GritDB")
      .collection("MemberSubscriptions")
      .findOneAndUpdate(
        { name: name, phone: phone, status: "Trial" },
        updateFields,
        { returnDocument: "after" } // Return the updated document
      );

    if (result) {
      // Record was updated
      console.log(`Updated member:`, result);
    } else {
      member.joiningDate = new Date(member.joiningDate);
      member.membershipstart = new Date(member.membershipstart);
      const existingMember = await client
        .db("GritDB")
        .collection("MemberSubscriptions")
        .findOne(
          { name: name, phone: phone },
          updateFields,
          { returnDocument: "after" } // Return the updated document
        );
      console.log("existingMember:::", existingMember);
      member.status = "Pending Approval";
      // No record found, insert a new record
      await client
        .db("GritDB")
        .collection("MemberSubscriptions")
        .insertOne(member);
      console.log(`Inserted new member:`, member);
    }
  } catch (error) {
    console.error("Error updating member payment:", error);
  }
};

const addRecordForMemberPayment = async (member) => {
  member.joiningDate = new Date(member.joiningDate);
  member.membershipstart = new Date(member.membershipstart);
  member.status = "Pending Approval";

  let result = await client
    .db("GritDB")
    .collection("MemberSubscriptions")
    .insertOne(member);
  result.acknowledged
    ? console.log("member inserted in DB successfuly")
    : console.log("something went wrong");
};
const addTrialMember = async (member) => {
  member.joiningDate = new Date(member.joiningDate);
  var postStatus;
  postStatus = await insertMember(member);
  console.log("\n\nInsert status::::::", postStatus);
};

app.listen(5000, () => {
  console.log(`Server is running on port: ${5000}`);
});

// Start the WhatsApp client
whatsappClient.initialize();
