const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema({
  title: {type:String, required: true},
  type:{type:String, required: true},
  description: {type:String},
  guests:{type:Number, required: true},
  bedrooms:{type:Number, required: true},
  bathrooms:{type:Number, required: true},
  price:{type:Number, required: true},
  rating:{type:Number, required: true},
  image:{type:String},
});

module.exports = mongoose.model("Property", propertySchema);