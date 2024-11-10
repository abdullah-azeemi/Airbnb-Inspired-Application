const express = require("express");
const multer = require("multer");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const Property = require("../models/Property");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/admin/properties", authMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description, type, guests, bedrooms, bathrooms, price } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newProperty = new Property({
      title,
      description,
      type,
      guests,
      bedrooms,
      bathrooms,
      price,
      imagePath,
    });
    await newProperty.save();

    res.status(201).json({ message: "Property added successfully", property: newProperty });
  } catch (error) {
    res.status(500).json({ message: "Error adding property", error });
  }
});


module.exports = router;
