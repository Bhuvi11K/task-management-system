const express = require("express");
const router = express.Router();
const db = require("../../db/knexfile");

const { authenticateToken } = require("../../middleware/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const unmappedDevelopers = await db("appusers")
      .where("role", "Jr Developer")
      .whereNotIn(
        "id",
        db("teams").select("developer_id").whereNotNull("developer_id")
      )
      .select(["id", "name", "role", "email"]);

    res.status(200).json(unmappedDevelopers);
  } catch (error) {
    console.error("Error fetching unmapped developers:", error);
    res.status(500).json({ error: "Error fetching unmapped developers" });
  }
});

module.exports = router;
