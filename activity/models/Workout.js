const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now },
  status: { type: String, default: "incomplete" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Workout", workoutSchema);
