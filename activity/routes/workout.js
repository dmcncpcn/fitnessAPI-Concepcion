
const express = require("express");
const {
  addWorkout,
  getMyWorkouts,
  updateWorkout,
  deleteWorkout,
  completeWorkoutStatus,
} = require("../controllers/workoutController");


const router = express.Router();

router.post("/addWorkout", addWorkout);
router.get("/getMyWorkouts", getMyWorkouts);
router.patch("/updateWorkout/:id", updateWorkout);
router.delete("/deleteWorkout/:id", deleteWorkout);
router.patch("/completeWorkoutStatus/:id", completeWorkoutStatus);

module.exports = router;
