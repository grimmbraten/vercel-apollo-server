import { helloWorld } from '../functions/index.js';

export const resolvers = {
  Query: {
    helloWorld: () => helloWorld()
  }
};
