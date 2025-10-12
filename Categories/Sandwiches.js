import mongoose from "mongoose";

const sandwichSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  defaultprice: {
    type: Number,
    default: 0
  },
  offer: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

export const Sandwiches = mongoose.model("Sandwiche", sandwichSchema);
