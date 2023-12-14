const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Endpoint to save the image on the server
app.post("/saveImage", (req, res) => {
  try {
    const { imageDataUrl } = req.body;

    // Extract the base64 data from the data URL
    const base64Data = imageDataUrl.split(",")[1];
    const imageBuffer = Buffer.from(base64Data, "base64");

    // Save the image to the server
    const imagePath = path.join(__dirname, "uploads", "post_image.png");
    fs.writeFileSync(imagePath, imageBuffer);

    res.json({ success: true, message: "Image saved on the server" });
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
