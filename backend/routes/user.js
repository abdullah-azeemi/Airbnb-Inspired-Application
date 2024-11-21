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
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) }
    });

    const totalListingsLastMonth = await Property.countDocuments({
      owner: userId,
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) }
    });

    const totalSpent = await Booking.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$totalCost" } } }
    ]);

    const totalEarned = await Property.aggregate([
      { $match: { owner: userId } },
      { $group: { _id: null, total: { $sum: "$earnings" } } }
    ]);

    res.json({
      totalBookingsLastMonth,
      totalListingsLastMonth,
      totalSpent: totalSpent[0]?.total || 0,
      totalEarned: totalEarned[0]?.total || 0,
      listings: user.listings
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
});

module.exports = router;