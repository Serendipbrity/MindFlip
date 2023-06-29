const { User, FlashCards } = require('../models');

const resolvers = {
    Query: {
        // view all users
        viewUsers: async () => {
            try {
                const users = await User.find();
                return users;
            } catch (err) { 
                console.log(err);
                throw new Error("No users found")
             }
            
        },
        // view a single user 
        viewUser: async (args) => {
            try {
                const user = await User.findOne({ args });
                return user;
            } catch {
                console.log(err);
                throw new Error("No user found")
            }
           
        },
        // view all flash cards
        viewFlashCards: async () => { 
            try {
                const flachCards = await FlashCards.find();
                return flachCards;
            } catch (err) { 
                console.log(err);
                throw new Error("No flash cards found")
             }
        },
        // view a single flash card
        viewFlashCard: async (args) => { 
            try {
                const flashCard = await FlashCards.findOne({ args });
                return flashCard;
            } catch (err) { 
                console.log(err);
                throw new Error("No flash card found")
             }
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