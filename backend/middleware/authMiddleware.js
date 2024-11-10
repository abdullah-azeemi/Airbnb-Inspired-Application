const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info from JWT to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

const adminMiddleware = (req, res, next) => {
  console.log("User data in adminMiddleware:", req.user); 
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied. Admins only." });
  next();
};


module.exports = { authMiddleware, adminMiddleware };
