import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { typeDefs, resolvers } from '../schema/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(({ headers: { authorization } }, res, next) => {
  if (authorization !== process.env.KEY) return res.status(401).json({ error: 'Unauthorized' });
  next();
});

const httpServer = http.createServer(app);

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    playground: true,
    introspection: true
  });

  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer(app, httpServer);

export default httpServer;
