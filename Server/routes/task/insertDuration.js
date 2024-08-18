const express = require("express");
const router = express.Router();
const db = require("../../db/knexfile");

const { authenticateToken } = require("../../middleware/authenticateToken");

router.post("/", authenticateToken, async (req, res) => {
  const { developerId, taskId, duration } = req.body;

  try {
    await db("taskduration").insert({
      developer_id: developerId,
      task_id: taskId,
      duration: duration,
    });

    res.status(201).json({ message: "Task duration sended successfully" });
  } catch (error) {
    console.error("Error sending task duration", error);
    res.status(500).json({ error: "Error sending task duration" });
  }
});

module.exports = router;
