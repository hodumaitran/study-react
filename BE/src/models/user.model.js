import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  avatar: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/128/456/456212.png",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
