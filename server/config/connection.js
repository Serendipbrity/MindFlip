const mongoose = require('mongoose');

// generate the database name with the end of the string
const connection = mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mindflip', {useNewUrlParser:true, useUnifiedTopology: true});

connection
    .then(db => {
        console.log("Successfully connected to MongoDB");
        return db;
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

module.exports = mongoose.connection;