const { User, FlashCards } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        flashCards: async () => { 
            return await FlashCards.find({});
         }
    }
};

module.exports = resolvers;