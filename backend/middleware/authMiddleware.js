const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("Headers:", req.headers);
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Extracted token:", token);
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = { authMiddleware };
