const { User, FlashCards } = require('../models');

const resolvers = {
    Query: {
        viewUsers: async () => {
            return await User.find();
        },
        viewFlashCards: async () => { 
            return await FlashCards.find();
         }
    },
    Mutation: {
        addFlashCard: async (_, args) => { 
            try {
                const flashCard = await FlashCards.create(args);
                return flashCard;
            } catch (err) { 
                console.log(err);
                throw new Error("Failed to create flash card")
             }
         },
        addUser: async (_, args ) => { 
            const user = await User.create(args);
            return user;
         }
    }
};

module.exports = resolvers;