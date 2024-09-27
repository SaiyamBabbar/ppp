const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const app = express();
const port = 4000;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dq1nbyjbl", // Your Cloudinary cloud name
  api_key: "647871996934283", // Your Cloudinary API key
  api_secret: "iHFyYKhTX0_9IetsjoPRzYCN5SQ", // Your Cloudinary API secret
});

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// File upload route
app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  // Upload image to Cloudinary
  cloudinary.uploader
    .upload_stream({ resource_type: "auto" }, (error, result) => {
      if (error) {
        return res.status(500).json({ error });
      }

      res.json({
        message: "File uploaded successfully",
        url: result.secure_url,
      });
    })
    .end(file.buffer);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
