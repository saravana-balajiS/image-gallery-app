import express from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";
import path from "path";

const app = express();
const PORT = 5000;
const DATA_FILE = "./images.json";
const UPLOADS_DIR = "./uploads";

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(UPLOADS_DIR)); // serve uploaded files

// ensure uploads folder exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Load/save helpers
function loadImages() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}
function saveImages(images) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(images, null, 2));
}

let images = loadImages();

// Get all images
app.get("/api/images", (req, res) => {
  res.json(images);
});

// Add new image by URL
app.post("/api/images", (req, res) => {
  const { url } = req.body;
  if (url) {
    images.push(url);
    saveImages(images);
    res.json({ success: true });
  } else {
    res.status(400).json({ error: "URL required" });
  }
});

// Upload local image
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (req.file) {
    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    images.push(fileUrl);
    saveImages(images);
    res.json({ success: true, url: fileUrl });
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
});

// Delete by index
app.delete("/api/images/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < images.length) {
    const removed = images.splice(index, 1);
    saveImages(images);
    res.json({ success: true, removed });
  } else {
    res.status(400).json({ error: "Invalid index" });
  }
});

app.listen(PORT, () => {
  console.log(`🖼️ Backend running on http://localhost:${PORT}`);
});
