import mongoose from "mongoose";

const User = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.models.User || mongoose.model("User", User);
