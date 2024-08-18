const express = require("express");
const router = express.Router();
const db = require("../../db/knexfile");
const { authenticateToken } = require("../../middleware/authenticateToken");

router.delete("/", authenticateToken, async (req, res) => {
  const { taskId } = req.body;

  if (!taskId) {
    return res.status(400).json({ error: "Please provide taskId" });
  }

  try {
    const taskExists = await db("tasks").where({ id: taskId }).first();

    if (!taskExists) {
      return res.status(404).json({ error: "Task not found" });
    }

    const taskDurationExists = await db("taskduration")
      .where({ task_id: taskId })
      .first();

    if (taskDurationExists) {
      // If the task_id is found in taskduration table, delete the corresponding row first
      await db("taskduration").where({ task_id: taskId }).del();
    }

    await db("tasks").where({ id: taskId }).del();

    res
      .status(200)
      .json({
        message: "Task and related task durations deleted successfully",
      });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Error deleting task" });
  }
});

module.exports = router;
