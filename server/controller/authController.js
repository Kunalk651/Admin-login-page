const bcrypt = require("bcryptjs");
const User = require("../model/user");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exist" });
    }

    const users = new User({ name, email, password });
    const salt = await bcrypt.genSalt(12);
    users.password = await bcrypt.hash(password, salt);
    await users.save();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error!" });
  }
};

exports.getLogin = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "internal server error" });
  }
};

exports.postLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid Email." });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid Password." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "internal server error" });
  }
};
