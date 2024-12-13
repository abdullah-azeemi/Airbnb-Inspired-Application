const express = require("express");
const {authMiddleware} = require("../middleware/authMiddleware");
const Booking = require("../models/booking");
const User = require("../models/user");
const Property = require("../models/property");
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
  const { listingId, checkIn, checkOut, numberOfGuests } = req.body;

  try {
    const property = await Property.findById(listingId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const totalPrice = property.price * numberOfGuests;

    const booking = new Booking({
      listingId,
      checkIn,
      checkOut,
      totalPrice,
      numberOfGuests,
      userId: req.user.id,
    });

    await booking.save();

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { totalSpent: totalPrice },
    });

    await User.findByIdAndUpdate(property.owner, {
      $inc: { totalEarned: totalPrice },
    });

    res.status(201).json({ message: "Booking created successfully.", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  console.log("Delete request for booking ID:", req.params.id);
  console.log("User ID from token:", req.user.id);
  try {
    const booking = await Booking.findById(req.params.id);
    console.log("Booking found:", booking);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    console.log("Booking user ID:", booking.userId.toString());
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to cancel this booking" });
    }
    booking.status = 'cancelled'; // Update status to cancelled
    await booking.save();
    res.json({ message: "Booking canceled successfully", booking });
  } catch (error) {
    console.error("Error canceling booking:", error);
    res.status(500).json({ message: "Error canceling booking", error: error.message });
  }
});

module.exports = router;
