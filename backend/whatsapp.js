const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(bodyParser.json());

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: path.join(__dirname, "custom_auth_path"), // Specify a custom path if needed
  }),
  puppeteer: {
    headless: true,
    timeout: 60000,
  },
});

// Generate QR code for authentication
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Scan the QR code above to authenticate.");
});

// Client is ready
client.on("ready", async () => {
  console.log("WhatsApp client is ready!");
  const number = "918124640336@c.us";
  const message = "Hello from my GRIT BOT!";
  // await client.sendMessage(number, message);
});

// Handle incoming messages
client.on("message", async (message) => {
  try {
    // Check for messages from specific groups
    if (
      message.from === "120363329610073428@g.us" &&
      message.body.toLowerCase().includes("name")
    ) {
      const data = parseMessage(message.body, "detail");

      if (message.hasMedia) {
        const media = await message.downloadMedia();
        if (media) {
          const fileName = `image_${data.name.replace(/ /g, "")}.jpg`;
          const imagePath = path.join(
            __dirname,
            "..",
            "public",
            "assets",
            "memberImages",
            fileName
          );

          // Create directory if it doesn't exist
          fs.mkdirSync(path.dirname(imagePath), { recursive: true });

          // Save the image to a file
          fs.writeFileSync(imagePath, media.data, { encoding: "base64" });
          console.log(`Image saved to ${imagePath}`);
          data.url = imagePath;
        } else {
          console.error("Media download failed.");
        }
      } else {
        console.log("Received a non-media message:", message.body);
      }

      await sendToServer(data, "memberdetail");
    }

    if (
      message.from === "120363346571790033@g.us" &&
      message.body.toLowerCase().includes("name")
    ) {
      const data = parseMessage(message.body, "payment");
      await sendToServer(data, "memberpayment");
    }
  } catch (error) {
    console.error("Error processing message:", error);
  }
});
const computeExpiryDate = (startdate, membership) => {
  let expiryDate;

  // Parse the dd/mm/yyyy format
  if (startdate && membership) {
    const [day, month, year] = startdate.split("/").map(Number);
    const startDateObj = new Date(year, month - 1, day);
    switch (membership.toLowerCase().trim()) {
      case "monthly":
        expiryDate = new Date(
          startDateObj.setDate(startDateObj.getDate() + 30)
        );
        break;
      case "quarterly":
        expiryDate = new Date(
          startDateObj.setDate(startDateObj.getDate() + 90)
        );
        break;
      case "half yearly":
        expiryDate = new Date(
          startDateObj.setDate(startDateObj.getDate() + 180)
        );
        break;
      case "annual":
        expiryDate = new Date(
          startDateObj.setFullYear(startDateObj.getFullYear() + 1)
        );
        break;
      default:
        break;
    }
  }
  return expiryDate;
};

// Example Usage
const startDate = "01/10/2024"; // Example start date in dd/mm/yyyy format
const membership = "monthly"; // Example membership type

const expiryDate = computeExpiryDate(startDate, membership);
console.log(expiryDate); // Outputs the expiry date

// Function to parse message body
function parseMessage(messageBody, flag) {
  const data = {};
  const lines = messageBody.split("\n");

  lines.forEach((line) => {
    const [key, value] = line.split(":").map((item) => item.trim());
    if (key && value) {
      switch (key.replace(/\s+/g, "").toLowerCase()) {
        case "name":
          data.name = value;
          break;
        case "dob":
          data.dateofbirth = value;
          break;
        case "email":
          data.email = value;
          break;
        case "phno":
          data.phone = value;
          break;
        case "emergencyno":
          data.emergencyNumber = value;
          break;
        case "height":
          data.height = parseFloat(value);
          break;
        case "weight":
          data.weight = parseFloat(value);
          break;
        case "medicalcondition":
          data.medicalCondition = value;
          break;
        case "amountpaid":
          data.totalPaid = value;
          break;
        case "membership":
          data.membership = value;
          break;
        case "startdate":
          data.membershipstart = value;
          break;
        case "paymentmode":
          data.lastpaymentmode = value;
          break;
        default:
          break;
      }
    }
  });
  // Add additional fields
  if (flag === "detail")
    Object.assign(data, {
      joiningDate: new Date(),
      membership: "NA",
      membershipAmount: 0,
      membershipstart: null,
      membershipend: null,
      invoicenumber: null,
      invoicedate: null,
      lastpaymentdate: null,
      lastpaymentmode: null,
      totalPaid: 0,
      plan: null,
      diet: null,
      trainer: null,
      paymentpending: null,
      pendingamount: 0,
      status: "Trial",
      lastupdatedTime: new Date(),
    });
  else if (flag === "payment")
    Object.assign(data, {
      joiningDate: new Date(),
      membershipend: computeExpiryDate(data.membershipstart, data.membership),
      invoicenumber: null,
      invoicedate: null,
      lastpaymentdate: new Date(),
      plan: null,
      diet: null,
      trainer: null,
      paymentpending: null,
      pendingamount: 0,
      lastupdatedTime: new Date(),
    });

  return data;
}

// Function to send data to server
async function sendToServer(data, flag) {
  try {
    const url =
      flag === "memberdetail"
        ? "http://localhost:5000/api/memberdetail"
        : "http://localhost:5000/api/memberpayment";
    const response = await axios.post(url, data);
    console.log("Server response:", response.data);
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
}

module.exports = client; // Export the client instance
