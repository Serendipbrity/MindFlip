const db = require('../config/connection');
const { User, FlashCards } = require('../models');
const userSeeds = require('./userSeeds.json');
const fcSeeds = require('./fcSeeds.json');

db.once('open', async () => {
  try {
    await FlashCards.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < fcSeeds.length; i++) {
      const { _id, username } = await FlashCards.create(fcSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: username },
        {
          $addToSet: {
            flashcards: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  await db.close();
  process.exit(0);
});
