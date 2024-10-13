const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const addTrialMember = require("./server");
const app = express();
app.use(bodyParser.json());

const fs = require("fs");
const path = require("path");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
  },
});
const memberDetail = [];
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Scan the QR code above to authenticate.");
});

client.on("ready", async () => {
  console.log("WhatsApp client is ready!");
  const number = "918778814975@c.us";
  const message = "Hello from my GRIT BOT!";
  await client.sendMessage(number, message);
});

client.on("message", async (message) => {
  // console.log("Message received:", message.from);
  if (
    message.from === "120363329610073428@g.us" &&
    message.body.toLowerCase().includes("name")
  ) {
    const data = parseMessage(message.body);

    if (message.hasMedia) {
      const media = await message.downloadMedia();
      const fileName = `image_${data.name.replace(/ /g, "")}.jpg`; // Customize filename as needed
      const imagePath = path.join(
        __dirname,
        "..",
        "public",
        "assets",
        "memberImages",
        fileName
      ); // Adjust filename as needed

      // Create the directory if it doesn't exist
      // fs.mkdirSync(path.dirname(imagePath), { recursive: true });

      data.url = imagePath;
      // Save the image to a file
      fs.writeFileSync(imagePath, media.data, { encoding: "base64" });
      console.log(`Image saved to ${imagePath}`);
    } else {
      console.log("Received a non-media message:", message.body);
    }
    sendToServer(data, "memberdetail");
  }
  if (
    message.from === "120363346571790033@g.us" &&
    message.body.toLowerCase().includes("name")
  ) {
    const data = parseMessage(message.body);
    sendToServer(data, "memberpayment");
  }
});

// client.on("message", async (msg) => {
//   if (msg.hasMedia) {
//     const media = await msg.downloadMedia();
//     const fileName = `image_${msg.id.id}.jpg`; // Customize filename as needed
//     const imagePath = path.join(__dirname, fileName);

//     // Save the image to a file
//     fs.writeFileSync(imagePath, media.data, { encoding: "base64" });
//     console.log(`Image saved to ${imagePath}`);
//   } else {
//     console.log("Received a non-media message:", msg.body);
//   }
// });
function parseMessage(messageBody) {
  const data = {};
  const lines = messageBody.split("\n");

  lines.forEach((line) => {
    const [key, value] = line.split(": ").map((item) => item.trim());
    if (key && value) {
      // Format keys to match your MongoDB schema
      switch (key) {
        case "Name":
          data.name = value;
          break;
        case "DOB":
          data.dateofbirth = value;
          break;
        case "Email":
          data.email = value;
          break;
        case "Ph no":
          data.phone = value;
          break;
        case "Emergency no":
          data.emergencyNumber = value;
          break;
        case "Height":
          data.height = parseFloat(value);
          break;
        case "Weight":
          data.weight = parseFloat(value);
          break;
        case "Medical condition":
          data.medicalCondition = value;
          break;
        default:
          break;
      }
    }
  });
  //add fields
  const joiningDate = new Date(); // Current date and time
  const formattedJoiningDate = `${String(joiningDate.getDate()).padStart(
    2,
    "0"
  )}-${String(joiningDate.getMonth() + 1).padStart(
    2,
    "0"
  )}-${joiningDate.getFullYear()}`;
  // data.imgurl = imgurl;
  data.joiningDate = formattedJoiningDate; // Midnight time
  data.membership = "NA";
  data.membershipAmount = 0;
  data.member_id = null;
  data.membershipstart = null;
  data.membershipend = null;
  data.invoicenumber = null;
  data.invoicedate = null;
  data.lastpaymentdate = null;
  data.lastpaymentmode = null;
  data.totalPaid = 0;
  data.plan = null;
  data.diet = null;
  data.trainer = null;
  data.paymentpending = null;
  data.pendingamount = 0;
  data.status = "Trial";

  return data;
}
async function sendToServer(data, flag) {
  try {
    if (flag === "memberdetail") {
      const response = await axios.post(
        "http://localhost:5000/api/memberdetail",
        data
      );
      console.log("Server response:", response.data);
    } else {
      const response = await axios.post(
        "http://localhost:5000/api/memberpayment",
        data
      );
      console.log("Server response:", response.data);
    }
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
}
module.exports = client; // Export the client instance
