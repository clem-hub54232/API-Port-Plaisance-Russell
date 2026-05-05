const Catway = require('../models/catway');
const mongoose = require('mongoose');

function isValidCatwayId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

exports.getById = async (req, res, next) => {
  const id = req.params.id;

  if (!isValidCatwayId(id)) {
    return res.status(400).json({ message: 'invalid_catway_id' });
  }

  try {
    const catway = await Catway.findById(id);

    if (catway) {
      return res.status(200).json(catway);
    }

    return res.status(404).json('catway_not_found');
  } catch (error) {
    console.error('GET CATWAY ERROR:', error);
    return res.status(500).json({ message: 'server_error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const catways = await Catway.find();
    return res.status(200).json(catways);
  } catch (error) {
    return res.status(500).json({ message: "server_error" });
  }
};

exports.add = async (req, res, next) => {
  const temp = {
    catwayNumber: Number(req.body.catwayNumber),
    catwayType: req.body.catwayType,
    catwayState: req.body.catwayState
  };

  if (!temp.catwayNumber || !temp.catwayType || !temp.catwayState) {
    return res.status(400).json({
      message: 'missing_required_fields'
    });
  }

  try {
    const catway = await Catway.create(temp);
    return res.status(201).json(catway);
  } catch (error) {
    console.error('ADD CATWAY ERROR:', error);
    return res.status(500).json({ message: 'server_error' });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  if (!isValidCatwayId(id)) {
    return res.status(400).json({ message: 'invalid_catway_id' });
  }

  try {
    const catway = await Catway.findByIdAndDelete(id);

    if (!catway) {
      return res.status(404).json({
        message: 'catway_not_found'
      });
    }

    return res.status(200).json({
      message: 'catway_deleted',
      catway: catway
    });
  } catch (error) {
    console.error('DELETE CATWAY ERROR:', error);
    return res.status(500).json({ message: 'server_error' });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;

  if (!isValidCatwayId(id)) {
    return res.status(400).json({ message: 'invalid_catway_id' });
  }

  const updatedData = {
    catwayNumber: Number(req.body.catwayNumber),
    catwayType: req.body.catwayType,
    catwayState: req.body.catwayState
  };

  if (!updatedData.catwayNumber || !updatedData.catwayType || !updatedData.catwayState) {
    return res.status(400).json({
      message: 'missing_required_fields'
    });
  }

  try {
    const catway = await Catway.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    if (!catway) {
      return res.status(404).json({
        message: 'catway_not_found'
      });
    }

    return res.status(200).json(catway);
  } catch (error) {
    console.error('EDIT CATWAY ERROR:', error);
    return res.status(500).json({ message: 'server_error' });
  }
};
