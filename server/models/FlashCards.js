const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const flashCardSchema = new Schema(
    {
        frontInput: {
            type: String,
            // required: [true, 'Please enter a flash card title'],
            trim: true
        },
        backInput: {
            type: String,
            // required: [true, 'Please enter a flash card description'],
            trim: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        // can make this an array of objects if need be. 
        // flashcards belong to one user
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

const FlashCards = model('FlashCards', flashCardSchema);

module.exports = FlashCards;