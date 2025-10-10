import mongoose from "mongoose";

const soupSchema = new mongoose.Schema({
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

export const Soups = mongoose.model("Soup", soupSchema);
