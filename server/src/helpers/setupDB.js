const mongoose = require('mongoose');

const {config: {MONGODB_URL}} = require('../config');

module.exports = () => {
    mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

    mongoose.connection.on('error', console.log.bind(console, 'MONGO ERROR'));
};
