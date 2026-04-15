const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const CatwaySchema = new Schema(
    {
        catwayNumber: {
            type: Number,
            unique: true,
        },
        catwayType: {
            type: String,
            trim: true,
            required: [true, "Le type est requis"]
        },
        catwayState: {
            type: String,
            trim: true,
            required: [true, "La description est requis"]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Catway', CatwaySchema);