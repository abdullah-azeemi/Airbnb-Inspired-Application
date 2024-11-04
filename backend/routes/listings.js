const express = require("express");
const router = express.Router();
const listings = require("../data/listings.json");

// Get all listings
router.get("/", (req, res) => {
  res.json(listings);
});

router.get("/:id", (req, res) => {
  const id = req.params.id; 
  console.log("Requested ID:", id); 
  const listing = listings.find(item => item.id === id); 
  console.log("Found Listing:", listing); 
  if (listing) {
    res.json(listing);
  } else {
    res.status(404).json({ error: "Listing not found" });
  }
});


module.exports = router;
