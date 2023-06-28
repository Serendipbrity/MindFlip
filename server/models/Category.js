const mongooose = require('mongoose');

const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
    {
        category: {
            type: String,
            required: [true, 'Please enter a cateory title'],
            trim: true
        },
        // can make this an array of objects if need be. 
        flashcards: [{
            type: Schema.Types.ObjectId,
            ref: 'FlashCards'
        }]
    }
);

const Category = model('Category', categorySchema);

module.exports = Category;