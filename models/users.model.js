const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["host", "attendee"], default: "attendee" },
  webinarsHosted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Webinar" }],
  webinarsAttended: [{ type: mongoose.Schema.Types.ObjectId, ref: "Webinar" }],
  createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;