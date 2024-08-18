const express = require("express");
const router = express.Router();
const db = require("../../db/knexfile");
const { authenticateToken } = require("../../middleware/authenticateToken");

router.delete("/", authenticateToken, async (req, res) => {
  const { managerId, developerIds } = req.body;

  if (!managerId) {
    return res.status(400).json({ error: "Please provide managerId" });
  }

  if (
    !developerIds ||
    !Array.isArray(developerIds) ||
    developerIds.length === 0
  ) {
    return res.status(400).json({ error: "Invalid or missing developerIds" });
  }

  try {
    const managerExists = await db("teams")
      .where({ manager_id: managerId })
      .first();
    console.log("Manager exists:", managerExists);

    if (!managerExists) {
      return res.status(404).json({ error: "Manager Id not found" });
    }

    await db("taskduration").whereIn("developer_id", developerIds).del();
    await db("tasks").whereIn("developer_id", developerIds).del();
    await db("teams").whereIn("developer_id", developerIds).del();
    await db("teams").where({ manager_id: managerId }).del();

    res.status(201).json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ error: "Error deleting team" });
  }
});

module.exports = router;
