const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../db/knexfile");

const { secretKey } = require("../../middleware/authenticateToken");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db("appusers").where({ email }).first();

    if (!user) {
      return res.status(400).json({ error: "Invalid Email or User Not Found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "24h",
    });

    const { password: userPassword, ...userData } = user;

    console.log("User Login successfully:", { token, user: userData });

    res.status(200).json({ token, user: userData });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
});

module.exports = router;
