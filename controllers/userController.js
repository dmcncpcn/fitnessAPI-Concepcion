const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../auth"); 
const bcrypt = require("bcrypt");
require("dotenv").config();

const { errorHandler } = auth;

module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "User registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).send({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "No user found with this email" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "Incorrect email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).send({
      message: "User logged in successfully",
      accessToken: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Login failed" });
  }
};
