const express = require("express");
const router = express.Router();

// Mock booking endpoint
router.post("/", (req, res) => {
  const { listingId, checkIn, checkOut } = req.body;
  if (!listingId || !checkIn || !checkOut) {
    return res.status(400).json({ message: "All fields are required" });
  }
  res.json({ message: "Booking successful", bookingDetails: req.body });
});

module.exports = router;
