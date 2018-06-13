import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { GraphQLServer } from 'graphql-yoga';

import path from 'path';

import constants from './config/constants';
import './config/db';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')));

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

const options = {
  cors: { origin: 'http://localhost:3000' },
  port: constants.PORT,
  endpoint: constants.GRAPHQL_PATH,
  subscriptions: '/subscriptions',
  playground: '/playground',
};

// eslint-disable-next-line no-console
server.start(options, () =>
  console.log('Server Running on http://localhost:3030/playground 🏃  🏃'));
