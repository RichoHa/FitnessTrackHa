const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSch = new Schema({
  day: {
    type: Date,
    default: Date.now(),
  },
  exercises: [{
    type: {
      type: String,
      trim: true,
      required: "Type of exercise is required"
    },
    name: {
      type: String,
      trim: true,
      required: "Name of the exercise is required"
    },
    duration: {
      type: Number,
      required: "Duration of the excercise is required"
    },
    weight: {
      type: Number,
    },
    reps: {
      type: Number,
    },
    sets: {
      type: Number,
    },
    distance: {
      type: Number,
    }
  }]
});
const Workout = mongoose.model("Workout", workoutSch);

module.exports = Workout;