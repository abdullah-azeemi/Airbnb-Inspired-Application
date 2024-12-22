const express = require("express");
const multer = require("multer");
const { authMiddleware } = require("../middleware/authMiddleware");
const Property = require("../models/property");
const router = express.Router();
const path = require('path');
const User = require("../models/user");

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Correct path to backend/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Save with a unique name
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Route to create a new listing
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  console.log("File received:", req.file); // Log the received file
  console.log("Request body:", req.body); // Log the request body

  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Construct the full URL

    const propertyData = {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      price: parseFloat(req.body.price),
      guests: parseInt(req.body.guests),
      bedrooms: parseInt(req.body.bedrooms),
      bathrooms: parseInt(req.body.bathrooms),
      owner: req.user.id,
      userName: req.user.name,
      userEmail: req.user.email,
      imagePath: imagePath, // Save the full image URL
    };

    const property = new Property(propertyData);
    await property.save();

    // Add property ID to user's listings
    await User.findByIdAndUpdate(req.user.id, {
      $push: { listings: property._id },
    });

    res.status(201).json(property);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Error creating property", error: error.message });
  }
});

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
    res.status(500).json({ message: "Error fetching properties" });
  }
});

router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    // If no query is provided, return all properties
    try {
      const properties = await Property.find({});
      return res.json(properties);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching properties", error });
    }
  }
  
  try {
    const searchQuery = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    };
    console.log("Search query:", searchQuery); // For debugging
    const properties = await Property.find(searchQuery);
    res.json(properties);
  } catch (error) {
    console.error("Error searching properties:", error);
    res.status(500).json({ message: "Error searching properties", error });
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
