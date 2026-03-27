const User = require('../models/user');

exports.getById= async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (user) {
      return res.status(200).json(user);
    }

    return res.status(404).json('user_not_found');
  } catch (error) {
    console.error('GET USER ERROR:', error);
    return res.status(500).json({
      message: 'server_error',
      error: error.message
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "server_error",
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

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
    return res.status(500).json({
      message: "server_error",
      error: error.message
    });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;

  const updatedData = {
    name: req.body.name,
    firstname: req.body.firstname,
    email: req.body.email
  };

  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!user) {
      return res.status(404).json({
        message: "user_not_found"
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server_error",
      error: error.message
    });
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
    return res.status(201).json(user);
  } catch (error) {
    console.error('ADD USER ERROR:', error);
    return res.status(500).json({
      message: 'server_error',
      error: error.message
    });
  }
};