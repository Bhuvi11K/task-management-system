const express = require("express");
const router = express.Router();
const db = require("../../db/knexfile");
const { authenticateToken } = require("../../middleware/authenticateToken");

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { managerId } = req.body;

    // Fetch developers mapped to the manager from the teams table
    const developers = await db("teams")
      .where("manager_id", managerId)
      .join("appusers as a1", "teams.developer_id", "a1.id")
      .select("a1.id", "a1.name", "a1.role", "a1.email");

    res.status(200).json(developers);
  } catch (error) {
    console.error("Error fetching developers for the manager:", error);
    res
      .status(500)
      .json({ error: "Error fetching developers for the manager" });
  }
});

module.exports = router;
