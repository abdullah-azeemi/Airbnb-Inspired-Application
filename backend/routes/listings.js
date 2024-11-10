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

router.get("/:id", (req, res) => {
  try{
    const property = Property.findById(req.params.id);
    if(!property){
      res.status(404).json({message: "Property not found"});
    }
    res.json(property);
  }
  catch(error){
    res.status(500).json({message: "Error Fteching Property"});
  }
});


module.exports = router;
