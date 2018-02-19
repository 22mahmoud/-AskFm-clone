import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { execute, subscribe } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import path from 'path';

import constants from './config/constants';
import './config/db';
import { decodeToken } from './services/auth';

const app = express();

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token != null) {
      const user = await decodeToken(token);
      req.user = user;
    } else {
      req.user = null;
    }
    return next();
  } catch (error) {
    throw error;
  }
};

// middlewares
app.use(bodyParser.json());
app.use(cors('*'));
app.use(auth);

app.use(
  '/graphiql',
  bodyParser.json(),
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH,
    subscriptionsEndpoint: `ws://localhost:${constants.PORT}/subscriptions`,
  }),
);

app.use(
  constants.GRAPHQL_PATH,
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user,
    },
  })),
);

const graphQlServer = createServer(app);

graphQlServer.listen(constants.PORT, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  } else {
    // eslint-disable-next-line no-new
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
      },
      {
        server: graphQlServer,
        path: '/subscriptions',
      },
    );
    // eslint-disable-next-line no-console
    console.log(`App listen on port: ${constants.PORT}`);
  }
});
