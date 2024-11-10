const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const booking = require("../models/booking");
const router = express.Router();

// Mock booking endpoint
router.post("/", async (req, res) => {
  const {propertyId, checkInDate, checkOutDate, totalCost} = req.body;
  try{
    const booking = new booking({propertyId, checkInDate, checkOutDate, totalCost});
    await booking.save();
    res.status(201).json({message: "Booking created successfully.", booking });
  }
  catch(error){
    res.status(500).json({message: "Error Fteching Property"});
  }
});

module.exports = router;
