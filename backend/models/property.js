const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  status: { type: String, enum: ["available", "booked"], default: "available" },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  imagePath: { type: String },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalEarned: { type: Number, default: 0 },
}, {
  timestamps: true
});

module.exports = mongoose.model("Property", propertySchema);
