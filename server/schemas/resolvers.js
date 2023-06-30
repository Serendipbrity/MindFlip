const { User, FlashCards } = require("../models");

const resolvers = {
  Query: {
    // view all users
    viewUsers: async () => {
          try {
        //   find all users and populate with flashcards
              const users = await User.find().populate("flashcards");
          return users;
      } catch (err) {
        console.log(err);
        throw new Error("No users found");
      }
    },
    // view a single user
    viewUser: async (args) => {
        try {
        //   find ine user and populate with flashcards
        const user = await User.findOne({ args }).populate("flashcards");
        return user;
      } catch {
        console.log(err);
        throw new Error("No user found");
      }
    },
    // view all flash cards
    viewFlashCards: async () => {
      try {
        const flachCards = await FlashCards.find();
        return flachCards;
      } catch (err) {
        console.log(err);
        throw new Error("No flash cards found");
      }
    },
    // view a single flash card
    viewFlashCard: async (args) => {
      try {
        const flashCard = await FlashCards.findOne({ args });
        return flashCard;
      } catch (err) {
        console.log(err);
        throw new Error("No flash card found");
      }
    },
  },
  Mutation: {
    addFlashCard: async (_, args) => {
      try {
        const flashCard = await FlashCards.create(args);
        return flashCard;
      } catch (err) {
        console.log(err);
        throw new Error("Failed to create flash card");
      }
    },
    addUser: async (_, args) => {
      const user = await User.create(args);
      return user;
    },
    // update a user
      updateUser: async (_, args) => {
      try {
          const user = await User.
            //   condition: first _id: is the key we are trying to match, second args._id: is the value we are trying to match
              findOneAndUpdate({ _id: args._id },
                //   data to update
                  args, {
                //   return updated data
            new: true,
              });
        return user;
      } catch {
        console.log(err);
        throw new Error("No user found");
      }
      },
    //   delete user
    deleteUser: async (_, { _id }) => {
        try {
            // --find-- user by id
            const user = await User.findById(_id);
            // if no user found throw error
            if (!user) {
                throw new Error("No user found");
            }
            // --delete-- user
            await User.findByIdAndDelete(_id);
            // return deleted user to confirm
            return user;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    // add flashcards to user
    addFlashCardToUser: async (_, { userId, flashcards }) => {
        try {
            // find user by userId and update with flashcards
          const user = await User.findByIdAndUpdate(
              userId,
            // $addToSet so we don't add duplicates
              { $addToSet: { flashcards: flashcards } },
            // return updated data
              { new: true }
            // populate with flashcards
          ).populate("flashcards");
          if (!user) {
            throw new Error('User not found');
          }
          return user;
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
      
  },
};

module.exports = resolvers;
