const express = require("express");
const router = express.Router();
const db = require("../../db/knexfile");
const { authenticateToken } = require("../../middleware/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const juniorDevelopers = await db("appusers")
      .where("role", "Jr Developer")
      .select(["id", "name", "role", "email"]);
    res.status(200).json(juniorDevelopers);
  } catch (error) {
    console.error("Error fetching junior developers:", error);
    res.status(500).json({ error: "Error fetching junior developers" });
  }
});

module.exports = router;
