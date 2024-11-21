const express = require("express");
const Property = require("../models/property");
const router = express.Router();
// const listings = require("../data/listings.json");

// Get all listings
router.get("/",  async (req, res) => {
  try{
    const properties = await Property.find();
    res.json(properties);
  }
  catch(error){
    res.status(500).json({message: "Error Fteching Credentials"});
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
    res.status(500).json({ message: "Error fetching property", error: error.message });
  }
});


module.exports = router;
