const express = require("express");
const {authMiddleware} = require("../middleware/authMiddleware");
const Booking = require("../models/booking");
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("user", req.user);
    const bookings = await Booking.find({ userId }).populate("listingId");
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings", error });
  }
});


router.post("/", authMiddleware, async (req, res) => {
  const { listingId, checkIn, checkOut, totalPrice, numberOfGuests } = req.body;
  
  console.log("Received booking request:", {
    listingId,
    checkIn,
    checkOut,
    totalPrice,
    numberOfGuests,
    userId: req.user.id
  });

  try {
    const booking = new Booking({ 
      listingId, 
      checkIn, 
      checkOut, 
      totalPrice, 
      numberOfGuests, 
      userId: req.user.id 
    });
    
    await booking.save();
    res.status(201).json({ message: "Booking created successfully.", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
});

module.exports = router;
