const mongoose = require('mongoose');

// generate the database name with the end of the string
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mindflip');

module.exports = mongoose.connection;