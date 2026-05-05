const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { signToken } = require('../middlewares/auth');

function isValidUserId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

exports.getById= async (req, res, next) => {
  const id = req.params.id;

  if (!isValidUserId(id)) {
    return res.status(400).json({ message: 'invalid_user_id' });
  }

  try {
    const user = await User.findById(id);

    if (user) {
      return res.status(200).json(user);
    }

    return res.status(404).json('user_not_found');
  } catch (error) {
    console.error('GET USER ERROR:', error);
    return res.status(500).json({ message: 'server_error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    console.error('GET USERS ERROR:', error);
    return res.status(500).json({ message: "server_error" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  if (!isValidUserId(id)) {
    return res.status(400).json({ message: 'invalid_user_id' });
  }

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "user_not_found"
      });
    }

    return res.status(200).json({
      message: "user_deleted",
      user: user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server_error" });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;

  if (!isValidUserId(id)) {
    return res.status(400).json({ message: 'invalid_user_id' });
  }

  const updatedData = {
    name: req.body.name,
    firstname: req.body.firstname,
    email: req.body.email
  };

  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).json({
        message: "user_not_found"
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server_error" });
  }
};

exports.add = async (req, res, next) => {
  const temp = {
    name: req.body.name,
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password
  };

  try {
    const user = await User.create(temp);
    const safeUser = user.toObject();
    delete safeUser.password;
    return res.status(201).json(safeUser);
  } catch (error) {
    console.error('ADD USER ERROR:', error);
    return res.status(500).json({ message: 'server_error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email_and_password_required" });
  }

  try {
    const user = await User.findOne({ email: String(email || '').toLowerCase().trim() }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: "email_or_password_incorrect"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "email_or_password_incorrect"
      });
    }

    return res.status(200).json({
      message: "login_success",
      token: signToken(user),
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        firstname: user.firstname
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "server_error" });
  }
};
