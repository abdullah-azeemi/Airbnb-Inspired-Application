const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user from token:", decoded); // Log the decoded user
    req.user = decoded; 
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Log the error
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = { authMiddleware };