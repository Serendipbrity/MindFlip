const { User, FlashCards } = require('../models');

const resolvers = {
    Query: {
        // view all users
        viewUsers: async () => {
            try {
                const user = await User.find();
                return user;
            } catch (err) { 
                console.log(err);
                throw new Error("No user found")
             }
            
        },
        // view a single user 
        viewUser: async (args) => {
            return await User.findOne({args});
        },
        // view all flash cards
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