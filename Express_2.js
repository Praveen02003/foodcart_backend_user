import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}); 


const foodSchema = new mongoose.Schema({
  foodname: {
    type: String,
    required: true,
    unique: true
  },
  foodprice: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}); 

export const Signup = mongoose.model("Usersignup", userSchema);
export const Food = mongoose.model("Admin", foodSchema);

