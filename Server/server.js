const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api", apiRoutes);
app.use(express.static(path.join(__dirname, "../Client/dist")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client", "dist", "index.html"))
})

const PORT = process.env.PORT || 1102;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




