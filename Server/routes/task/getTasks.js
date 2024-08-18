const express = require("express");
const router = express.Router();
const db = require("../../db/knexfile");
const { authenticateToken } = require("../../middleware/authenticateToken");

router.post("/", authenticateToken, async (req, res) => {
  const { developerId } = req.body;

  try {
    const tasks = await db("tasks").where({ developer_id: developerId });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

module.exports = router;
