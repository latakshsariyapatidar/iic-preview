const express = require("express");
const router = express.Router();
const prisma = require("../db");
const authenticate = require("../middlewares/auth");

// POST new enquiry (Public)
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    const enquiry = await prisma.enquiry.create({
      data: { name, email, message },
    });

    res.status(201).json(enquiry);
  } catch (error) {
    console.error("Error creating enquiry:", error);
    res.status(500).json({ error: "Failed to create enquiry" });
  }
});

// GET all enquiries (Admin only)
router.get("/", authenticate, async (req, res) => {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ error: "Failed to fetch enquiries" });
  }
});

// PATCH toggle isRead status (Admin only)
router.patch("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;
    
    const enquiry = await prisma.enquiry.update({
      where: { id: parseInt(id) },
      data: { isRead },
    });
    
    res.json(enquiry);
  } catch (error) {
    console.error("Error updating enquiry:", error);
    res.status(500).json({ error: "Failed to update enquiry" });
  }
});

module.exports = router;
