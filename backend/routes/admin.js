const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const User = require("../models/user");
const Property = require("../models/property");
const router = express.Router();

const megaAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "mega-admin") {
    return res.status(403).json({ message: "Access denied." });
  }
  next();
};

router.get("/users", authMiddleware, megaAdminMiddleware, async (req, res) => {
  try {
    const users = await User.find().populate("listings");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

router.delete("/users/:id", authMiddleware, megaAdminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

router.get("/properties", authMiddleware, megaAdminMiddleware, async (req, res) => {
  try {
    const properties = await Property.find().populate("owner");
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
});

router.delete("/properties/:id", authMiddleware, megaAdminMiddleware, async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error });
  }
});

module.exports = router;