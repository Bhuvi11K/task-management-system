const express = require("express");
const router = express.Router();
const db = require("../../db/knexfile");
const { authenticateToken } = require("../../middleware/authenticateToken");

router.put("/", authenticateToken, async (req, res) => {
  const { userId, userName } = req.body;

  if (!userId || !userName) {
    return res.status(400).json({ error: "Please provide userId, userName" });
  }

  try {
    const userExists = await db("appusers").where({ id: userId }).first();

    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    await db("appusers").where({ id: userId }).update({
      name: userName,
    });

    const updatedUser = await db("appusers").where({ id: userId }).first();

    const { password, ...updatedUserData } = updatedUser;

    console.log("updatedUser:", updatedUser);

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUserData });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
});

module.exports = router;
