const express = require("express");
const router = express.Router();
const db = require("../../db/knexfile");
const { authenticateToken } = require("../../middleware/authenticateToken");

router.put("/", authenticateToken, async (req, res) => {
  const { taskId, developer_id, task } = req.body;

  if (!taskId || !developer_id || !task) {
    return res
      .status(400)
      .json({ error: "Please provide taskId, developer_id, and task" });
  }

  try {
    const taskExists = await db("tasks").where({ id: taskId }).first();

    if (!taskExists) {
      return res.status(404).json({ error: "Task not found" });
    }

    await db("tasks").where({ id: taskId }).update({
      developer_id: developer_id,
      task: task,
    });

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
});

module.exports = router;
