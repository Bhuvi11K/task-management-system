const express = require("express");
const router = express.Router();
const db = require("../../db/knexfile");
const { authenticateToken } = require("../../middleware/authenticateToken");

router.delete("/", authenticateToken, async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Please provide userId" });
  }

  try {
    const user = await db("appusers").where({ id: userId }).first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "Manager" || user.role === "Jr Developer") {
      await deleteUserData(userId, user.role);

      await db("appusers").where({ id: userId }).del();

      res.status(200).json({
        message: "User deleted successfully",
      });
    } else {
      return res
        .status(403)
        .json({ error: "Only Managers and Jr Developers can be deleted" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
});

async function deleteUserData(userId, userRole) {
  if (userRole === "Manager") {
    await db("teams").where("manager_id", userId).del();
    await db("tasks").where("manager_id", userId).del();
  } else if (userRole === "Jr Developer") {
    await db("taskduration").where("developer_id", userId).del();
    await db("tasks").where("developer_id", userId).del();
    await db("teams").where("developer_id", userId).del();
  }
}

module.exports = router;
