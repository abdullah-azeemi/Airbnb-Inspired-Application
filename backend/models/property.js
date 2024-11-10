const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  imagePath: { type: String },
});

const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);

module.exports = Property;
