const express = require("express");
const router = express.Router();
const db = require("../../db/knexfile");
const { authenticateToken } = require("../../middleware/authenticateToken");

router.delete("/", authenticateToken, async (req, res) => {
  const { developerId } = req.body;

  if (!developerId) {
    return res.status(400).json({ error: "Please provide developerId" });
  }

  try {
    const developerExists = await db("teams")
      .where({ developer_id: developerId })
      .first();

    if (!developerExists) {
      return res.status(404).json({ error: "Developer is not found" });
    }

    const taskDurationExists = await db("taskduration")
      .where({ developer_id: developerId })
      .first();

    if (taskDurationExists) {
      // If the developer_id is found in taskduration table, delete the corresponding row first
      await db("taskduration").where({ developer_id: developerId }).del();
    }

    const taskExists = await db("tasks")
      .where({ developer_id: developerId })
      .first();

    if (taskExists) {
      // If the developer_id is found in tasks table, delete the corresponding row first
      await db("tasks").where({ developer_id: developerId }).del();
    }

    await db("teams").where({ developer_id: developerId }).del();

    res.status(200).json({
      message:
        "Developer and developer related task, task durations are deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting developer:", error);
    res.status(500).json({ error: "Error deleting developer" });
  }
});

module.exports = router;
