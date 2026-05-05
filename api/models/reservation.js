const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const ReservationSchema = new Schema(
    {
        catwayNumber: {
            type: Number,
            unique: true,
        },
        clientName: {
            type: String,
            trim: true,
            required: [true, "Le Nom est requis"]
        },
        boatName: {
            type: String,
            trim: true,
            required: [true, "Le Nom est requis"]
        },
        startDate: {
            type: String,
            trim: true,
            required: [true, "La Date est requis"]
        },
        endDate: {
            type: String,
            trim: true,
            required: [true, "La Date est requis"]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Reservation', ReservationSchema);