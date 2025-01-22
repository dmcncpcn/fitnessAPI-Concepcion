
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const workoutRoutes = require("./routes/workout.js");
const userRoutes = require("./routes/user.js");


require("dotenv").config();

const app = express();
const { verify } = require("./auth");


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use("/workouts", verify, workoutRoutes);
app.use("/users", userRoutes);


const corsOptions = {
	origin: ['http://localhost:8000','http://localhost:4000', 'http://localhost:3000'],//allow requests from this origin
	credentials: true, // Allows credentials(cookies, authorization headers)
	optionsSuccessStatus: 200 // Provides a status code to use for successful options request

}


	app.use(cors(corsOptions));
// Database Connection
mongoose.connect(process.env.MONGODB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => {
  console.error('MongoDB connection error:', err.message);
});

if (require.main === module) {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`);
  });
}

module.exports = { app, mongoose };

