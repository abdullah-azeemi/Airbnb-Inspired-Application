const express = require("express");
const multer = require("multer");
const { authMiddleware } = require("../middleware/authMiddleware");
const Property = require("../models/property");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/my-listings", authMiddleware, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your properties", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property details", error });
  }
});

router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
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
      owner: req.user.id
    });
    
    await newProperty.save();
    res.status(201).json({ message: "Property added successfully", property: newProperty });
  } catch (error) {
    res.status(500).json({ message: "Error adding property", error });
  }
});

router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const property = await Property.findOne({ _id: req.params.id, owner: req.user.id });
    if (!property) {
      return res.status(404).json({ message: "Property not found or unauthorized" });
    }

    const updates = { ...req.body };
    if (req.file) {
      updates.imagePath = `/uploads/${req.file.filename}`;
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json({ message: "Property updated successfully", property: updatedProperty });
  } catch (error) {
    res.status(500).json({ message: "Error updating property", error });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found or unauthorized" });
    }

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error });
  }
});

module.exports = router;
