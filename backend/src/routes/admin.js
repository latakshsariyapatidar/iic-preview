const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key_here";

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, username: admin.username });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});

// Setup Initial Admin Account (Run once, then remove or secure)
router.post("/setup", async (req, res) => {
  try {
    const count = await prisma.admin.count();
    if (count > 0) {
      return res.status(400).json({ error: "Admin already exists. Setup locked." });
    }

    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.json({ message: "Admin created successfully", username: admin.username });
  } catch (error) {
    res.status(500).json({ error: "Failed to setup admin" });
  }
});

module.exports = router;
