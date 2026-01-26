import mongoose from "mongoose";

// creating schemal for users
const userSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  userPassword: { type: String },
currentStreak:{type:Number},
  createdAt: { type: Date, default: Date.now },
});

// creating models for kronos users
export const userModel = mongoose.model("User", userSchema);
