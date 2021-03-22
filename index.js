const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./typeDef');
const resolvers = require('./Resolvers');
const dotenv=require('dotenv');

dotenv.config({path : './config.env'});

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useCreateIndex:true
  })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });