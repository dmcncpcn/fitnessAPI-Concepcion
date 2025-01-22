const Workout = require("../models/Workout");

exports.addWorkout = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: No user found" });
    }
    const { name, duration, status } = req.body;
    if (!name || !duration) {
      return res.status(400).json({ error: "Name and duration are required" });
    }

    if (duration <= 0) {
      return res.status(400).json({ error: "Duration must be a positive number" });
    }

    const workout = await Workout.create({
      name,
      duration,
      status: status || "incomplete", 
      userId: req.user.id, 
    });

    res.status(201).json({
      message: "Workout added successfully",
      workout,
    });
  } catch (err) {
    console.error("Error adding workout:", err.message);
    res.status(500).json({ error: "Failed to add workout" });
  }
};

exports.getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve workouts" });
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!workout) return res.status(404).json({ error: "Workout not found" });
    res.json(workout);
  } catch (err) {
    res.status(400).json({ error: "Failed to update workout" });
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!workout) return res.status(404).json({ error: "Workout not found" });
    res.json({ message: "Workout deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete workout" });
  }
};

exports.completeWorkoutStatus = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status: "complete" },
      { new: true }
    );
    if (!workout) return res.status(404).json({ error: "Workout not found" });
    res.json(workout);
  } catch (err) {
    res.status(400).json({ error: "Failed to update workout status" });
  }
};
