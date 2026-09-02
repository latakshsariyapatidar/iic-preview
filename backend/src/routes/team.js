const express = require("express");
const prisma = require("../db");
const authenticate = require("../middlewares/auth");
const { upload, processImage } = require("../middlewares/upload");

const router = express.Router();

// GET all team members
router.get("/", async (req, res) => {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { createdAt: "asc" },
    });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

// POST new team member (Admin only)
router.post("/", authenticate, upload.single("image"), processImage, async (req, res) => {
  try {
    const { name, role, initials, linkedIn } = req.body;
    let imageUrl = req.body.imageUrl || null;

    if (req.processedImage) {
      imageUrl = req.processedImage.url;
    }
    
    if (!name || !role || !initials) {
      return res.status(400).json({ error: "Name, role, and initials are required" });
    }

    const member = await prisma.teamMember.create({
      data: { name, role, initials, linkedIn, imageUrl },
    });

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: "Failed to create team member" });
  }
});

// PUT update team member (Admin only)
router.put("/:id", authenticate, upload.single("image"), processImage, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, role, initials, linkedIn } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (initials) updateData.initials = initials;
    if (linkedIn !== undefined) updateData.linkedIn = linkedIn;
    
    if (req.processedImage) {
      updateData.imageUrl = req.processedImage.url;
    } else if (req.body.imageUrl) {
      updateData.imageUrl = req.body.imageUrl;
    }

    const member = await prisma.teamMember.update({
      where: { id },
      data: updateData,
    });

    res.json(member);
  } catch (error) {
    res.status(500).json({ error: "Failed to update team member" });
  }
});

// DELETE team member (Admin only)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.teamMember.delete({ where: { id } });
    res.json({ message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete team member" });
  }
});

module.exports = router;
