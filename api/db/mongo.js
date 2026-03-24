const mongoose = require('mongoose');

const clientOptions = {
    dbName: 'PortPlaisanceRussell'
};

exports.initClientDbConnection = async () => {
    try {
        /*
        ATTENTION :
        Il faut ajouter URL_MONGO dans ton fichier .env
        URL_MONGO = ta chaîne de connexion MongoDB Atlas
        */

        await mongoose.connect(process.env.URL_MONGO, clientOptions);

        console.log('MongoDB connectée');
    } catch (error) {
        console.log(error);
        throw error;
    }
}