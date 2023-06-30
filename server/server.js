const express = require('express');
const path = require('path');

const {ApolloServer} = require('apollo-server-express');

// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const models = require('./models');

// connect mongoose
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

// instansiate new ApolloServer and pass in our schema data 
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = express();

// needed for post requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if app is deployed use static files from build folder
if (process.env.NODE_ENV === 'production') { 
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// start apollo server and pass in express app as middleware then start express server
const startApolloServer = async () => { 
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    db.once('open', () => { app.listen(PORT, () => console.log(`MindFlip listening on PORT ${PORT}! Go to localhost:3001/graphql to view`)); });
 }


startApolloServer();
