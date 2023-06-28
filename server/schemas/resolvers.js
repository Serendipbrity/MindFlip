const { User, FlashCards } = require('../models');

const resolvers = {
    Query: {
        viewUsers: async () => {
            return await User.find();
        },
        viewFlashCards: async () => { 
            return await FlashCards.find({});
         }
    },
    Mutation: {
        addFlashCard: async (_, args) => { 
            const flashCard = await FlashCards.create( args );
            return flashCard;
         }
    },
    Mutation: {
        addUser: async (_, args ) => { 
            const user = await User.create(args);
            return user;
         }
    }
};

module.exports = resolvers;