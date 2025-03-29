const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  registrationLink: { type: String },
  status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" },
  createdAt: { type: Date, default: Date.now },
});

const WebinarModel = mongoose.model("Webinar", webinarSchema);

module.exports = WebinarModel;