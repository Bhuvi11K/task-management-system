const express = require("express");
const router = express.Router();
const db = require("../../db/knexfile");

const { authenticateToken } = require("../../middleware/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const managers = await db("appusers")
      .where("role", "Manager")
      .select(["id", "name", "role", "email"]);
    res.status(200).json(managers);
  } catch (error) {
    console.error("Error fetching managers:", error);
    res.status(500).json({ error: "Error fetching managers" });
  }
});

module.exports = router;
