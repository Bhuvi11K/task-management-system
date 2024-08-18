// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const db = require("../../db/knexfile");

// const { authenticateToken, secretKey } = require("../../middleware/authenticateToken");

// // Signup route
// router.post("/signup", async (req, res) => {
//     const { name, role, email, password } = req.body;

//     try {
//       console.log("Received signup request:", { name, role, email });
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       await db("appusers").insert({
//         name,
//         role,
//         email,
//         password: hashedPassword,
//       });
  
//       console.log("User registered successfully:", { name, email });
  
//       res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//       console.error("Error registering user:", error);
//       res.status(500).json({ error: "Error registering user" });
//     }
// });

// // Login route
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//       const user = await db("appusers").where({ email }).first();
  
//       if (!user) {
//         return res.status(401).json({ error: "Invalid Email" });
//       }
  
//       const passwordMatch = await bcrypt.compare(password, user.password);
  
//       if (!passwordMatch) {
//         return res.status(401).json({ error: "Incorrect Password" });
//       }
  
//       const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '24h' });
  
//       const { password: userPassword, ...userData } = user;
  
//       console.log("User Login successfully:", { token, user: userData  });
  
//       res.status(200).json({ token, user: userData });
//     }catch (error) {
//       console.error("Error during login:", error);
//       res.status(500).json({ error: "Error during login" });
//     }
// });

// module.exports = router;
