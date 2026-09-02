const express = require("express");
const prisma = require("../db");
const authenticate = require("../middlewares/auth");
const { upload, processImage } = require("../middlewares/upload");

const router = express.Router();

// GET all gallery images
router.get("/", async (req, res) => {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gallery images" });
  }
});

// POST new gallery image (Admin only)
router.post("/", authenticate, upload.single("image"), processImage, async (req, res) => {
  try {
    if (!req.processedImage && !req.body.imageUrl) {
      return res.status(400).json({ error: "Image file or URL is required" });
    }

    const imageUrl = req.processedImage ? req.processedImage.url : req.body.imageUrl;
    const caption = req.body.caption || null;

    const image = await prisma.galleryImage.create({
      data: { imageUrl, caption },
    });

    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// DELETE gallery image (Admin only)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.galleryImage.delete({ where: { id } });
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete image" });
  }
});

module.exports = router;
