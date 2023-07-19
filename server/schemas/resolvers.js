const { User, FlashCards } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    addFlashCard: async (_, args, context) => {
      try {
        // decode JWT from the request header
        const authHeader = context.req.headers.authorization;
        if (!authHeader) throw new Error("No token provided");
        const token = authHeader.split(" ")[1];

        const { id } = jwt.verify(token, "secret");
        // Create the flashcard and associate with the user's ID
        const flashCard = await FlashCards.create({ ...args, userId: id });

        // Add the flashcard to the user
        await User.findByIdAndUpdate(id, {
          $push: { flashcards: flashCard._id },
        });

        return flashCard;
      } catch (err) {
        console.log(err);
        throw new Error("Failed to create flash card");
      }
    },
    // register new user
    addUser: async (_, args) => {
      console.log(args); // to check if the arguments are received correctly
      const user = await User.create(args);
      console.log(user); // to check if the user is being created
      return user;
    },
    // login user
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("No user with that email");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Incorrect password");
      }
      return {
        token: user.generateJWT(),
        user,
      };
    },
    // update a user
    updateUser: async (_, args) => {
      try {
        const user = await User
          //   condition: first _id: is the key we are trying to match, second args._id: is the value we are trying to match
          .findOneAndUpdate(
            { _id: args._id },
            //   data to update
            args,
            {
              //   return updated data
              new: true,
            }
          );
        return user;
      } catch {
        console.log(err);
        throw new Error("No user found");
      }
    },
    //   update flash card
    updateFlashCard: async (_, args) => {
      try {
        const flashCard = await FlashCards.findOneAndUpdate(
          { _id: args._id },
          args,
          { new: true }
        );
        return flashCard;
      } catch (err) {
        console.log(err);
        throw new Error("No flash card found");
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
    //   delete flash card
    deleteFlashCard: async (_, { _id }) => {
      try {
        // --find-- flash card by id
        const flashCard = await FlashCards.findById(_id);
        // if no flash card found throw error
        if (!flashCard) {
          throw new Error("No flash card found");
        }
        // --delete-- flash card
        await FlashCards.findByIdAndDelete(_id);
        // return deleted flash card to confirm
        return flashCard;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    // add flashcards to user
    addFlashCardToUser: async (_, { userId, frontInput, backInput }) => {
      try {
        // Create the flashcard
        const flashCard = await FlashCards.create({ frontInput, backInput, userId });
    
        // Add the flashcard to the user
        const user = await User.findByIdAndUpdate(
          userId,
          // $addToSet to add the flashcard's ID to the user's flashcards array
          { $addToSet: { flashcards: flashCard._id } },
          // return updated data
          { new: true }
        ).populate("flashcards");
    
        if (!user) {
          throw new Error("User not found");
        }
    
        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};

module.exports = resolvers;
