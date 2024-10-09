const fs = require("fs");

function convertToJSONArray(dataString) {
  const entries = dataString.trim().split(/\n\s*\n/);
  const jsonArray = [];

  entries.forEach((entry) => {
    const lines = entry.trim().split("\n");
    const jsonObject = {};

    lines.forEach((line) => {
      const [key, value] = line.split(":").map((item) => item.trim());
      jsonObject[key] = value || null; // Use null for empty values
    });

    jsonArray.push(jsonObject);
  });

  return jsonArray;
}

// Read the text file
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const jsonResultArray = convertToJSONArray(data);
  console.log(JSON.stringify(jsonResultArray, null, 2));
});
