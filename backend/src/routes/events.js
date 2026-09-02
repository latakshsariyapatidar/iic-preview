const express = require("express");
const prisma = require("../db");
const authenticate = require("../middlewares/auth");
const { upload, processImage } = require("../middlewares/upload");

const router = express.Router();

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// POST new event (Admin only)
router.post("/", authenticate, upload.single("image"), processImage, async (req, res) => {
  try {
    const { title, category, description } = req.body;
    let imageUrl = req.body.imageUrl || ""; // Fallback if no file uploaded

    if (req.processedImage) {
      imageUrl = req.processedImage.url;
    }

    if (!title || !category || !description || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const event = await prisma.event.create({
      data: { title, category, description, imageUrl },
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
});

// PUT update event (Admin only)
router.put("/:id", authenticate, upload.single("image"), processImage, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, category, description } = req.body;
    
    const updateData = {};
    if (title) updateData.title = title;
    if (category) updateData.category = category;
    if (description) updateData.description = description;
    if (req.processedImage) {
      updateData.imageUrl = req.processedImage.url;
    } else if (req.body.imageUrl) {
      updateData.imageUrl = req.body.imageUrl;
    }

    const event = await prisma.event.update({
      where: { id },
      data: updateData,
    });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

// DELETE event (Admin only)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.event.delete({ where: { id } });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

module.exports = router;
