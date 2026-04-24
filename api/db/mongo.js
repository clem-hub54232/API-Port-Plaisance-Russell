const mongoose = require('mongoose');
const Catway = require('../models/catway');

const clientOptions = {
    dbName: 'PortPlaisanceRussell'
};

exports.initClientDbConnection = async () => {
    try {

        await mongoose.connect(process.env.URL_MONGO, clientOptions);
        await Catway.syncIndexes();

        console.log('MongoDB connectée');
    } catch (error) {
        console.log(error);
        throw error;
    }
}
