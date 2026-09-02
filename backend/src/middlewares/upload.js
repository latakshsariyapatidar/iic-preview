const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Ensure public/uploads directory exists
const uploadDir = path.join(__dirname, "../../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config: Use memory storage to process the image first
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

// Middleware to process image using sharp
const processImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const outputPath = path.join(uploadDir, filename);

    // Resize and compress to WebP
    await sharp(req.file.buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);

    // Attach processed file info to req object
    req.processedImage = {
      filename,
      url: `/uploads/${filename}`,
      path: outputPath,
    };
    next();
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Failed to process image" });
  }
};

module.exports = { upload, processImage };
