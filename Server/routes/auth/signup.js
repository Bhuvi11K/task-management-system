const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../db/knexfile");

// Signup route
router.post("/", async (req, res) => {
  const { name, role, email, password } = req.body;

  try {
    console.log("Received signup request:", { name, role, email });

    // Check if the email already exists in the appusers table
    const existingUser = await db("appusers").where({ email }).first();

    if (existingUser) {
      console.log("Email already exists:", email);
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db("appusers").insert({
      name,
      role,
      email,
      password: hashedPassword,
    });

    console.log("User registered successfully:", { name, email });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
});

module.exports = router;
