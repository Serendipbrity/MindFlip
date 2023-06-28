const { User, FlashCards } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        flashcards: async () => { 
            return await FlashCards.find({});
         }
    }
};

module.exports = resolvers;