const express = require("express");
const router = express.Router();
const db = require("../../db/knexfile");

const { authenticateToken } = require("../../middleware/authenticateToken");

// Create a team
router.post("/", authenticateToken, async (req, res) => {
  const { managerId, developerId } = req.body;

  try {
    await db("teams").insert({
      manager_id: managerId,
      developer_id: developerId,
    });

    res.status(201).json({ message: "Team created successfully" });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: "Error creating team" });
  }
});

module.exports = router;
