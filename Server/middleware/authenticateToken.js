const jwt = require("jsonwebtoken");
const secretKey = "s3Cur3K#yF0rJWT!$gn1ng"; 

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
    req.user = { userId: decoded.userId };
    next();
  });
}

module.exports = {
  authenticateToken,
  secretKey,
};
