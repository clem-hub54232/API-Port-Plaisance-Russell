const Reservation = require('../models/reservation');
const mongoose = require('mongoose');

function isValidReservationId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

exports.getById = async (req, res, next) => {
  const id = req.params.id;

  if (!isValidReservationId(id)) {
    return res.status(400).json({
      message: 'invalid_reservation_id'
    });
  }

  try {
    const reservation = await Reservation.findById(id);

    if (reservation) {
      return res.status(200).json(reservation);
    }

    return res.status(404).json('reservation_not_found');
  } catch (error) {
    console.error('GET RESERVATION ERROR:', error);
    return res.status(500).json({
      message: 'server_error',
      error: error.message
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const reservation = await Reservation.find();
    return res.status(200).json(reservation);
  } catch (error) {
    return res.status(500).json({
      message: "server_error",
      error: error.message
    });
  }
};

exports.add = async (req, res, next) => {
  const temp = {
    catwayNumber: Number(req.body.catwayNumber),
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  if (!temp.catwayNumber || !temp.clientName || !temp.boatName || !temp.startDate || !temp.endDate) {
    return res.status(400).json({
      message: 'missing_required_fields'
    });
  }

  try {
    const reservation = await Reservation.create(temp);
    return res.status(201).json(reservation);
  } catch (error) {
    console.error('ADD RESERVATION ERROR:', error);
    return res.status(500).json({
      message: 'server_error',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  if (!isValidReservationId(id)) {
    return res.status(400).json({
      message: 'invalid_reservation_id'
    });
  }

  try {

    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return res.status(404).json({
        message: 'reservation_not_found'
      });
    }

    return res.status(200).json({
      message: 'reservation_deleted',
      reservation: reservation
    });
  } catch (error) {
    console.error('DELETE RESERVATION ERROR:', error);
    return res.status(500).json({
      message: 'server_error',
      error: error.message
    });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;

  if (!isValidReservationId(id)) {
    return res.status(400).json({
      message: 'invalid_reservation_id'
    });
  }

  const updatedData = {
    catwayNumber: Number(req.body.catwayNumber),
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,

  };

  if (!updatedData.catwayNumber || !updatedData.clientName || !updatedData.boatName || !updatedData.startDate || !updatedData.endDate) {
    return res.status(400).json({
      message: 'missing_required_fields'
    });
  }

  try {
    const reservation = await Reservation.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    if (!reservation) {
      return res.status(404).json({
        message: 'reservation_not_found'
      });
    }

    return res.status(200).json(reservation);
  } catch (error) {
    console.error('EDIT RESERVATION ERROR:', error);
    return res.status(500).json({
      message: 'server_error',
      error: error.message
    });
  }
};
