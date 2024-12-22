const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const User = require("../models/user");
const Booking = require("../models/booking");
const Property = require("../models/property");
const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("listings");

    const totalBookingsLastMonth = await Booking.countDocuments({
      userId,
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) },
    });

    const totalListingsLastMonth = await Property.countDocuments({
      owner: userId,
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) },
    });

    const totalSpent = await Booking.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    const totalEarned = await Booking.aggregate([
      { $match: { ownerId: userId } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    res.json({
      totalBookingsLastMonth,
      totalListingsLastMonth,
      totalSpent: totalSpent[0]?.total || 0,
      totalEarned: totalEarned[0]?.total || 0,
      listings: user.listings,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
});

// Get all users (for mega admin)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().populate("listings");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

module.exports = router;