import cors from 'cors';
import 'reflect-metadata';
import 'graphql-import-node';
import express from 'express';
import { createServer } from 'http';
import compression from 'compression';
import * as fed from '@apollo/federation';
import * as schema from './schema.graphql';
import {ApolloServer} from 'apollo-server-express';
import { GraphQLModule } from '@graphql-modules/core';

const app = express();
app.use('*', cors());
app.use(compression());

app.get('/', function (req: any, res: any) {
  res.json('ok...');
});
app.get('/test', function (req: any, res: any) {
  res.json('test...');
});

const fSchema = fed.buildFederatedSchema(schema);
const MyGraphQLModule = new GraphQLModule({
  typeDefs: fSchema
});
const server = new ApolloServer({
  schema: MyGraphQLModule.schema,
  context: session => session
});

server.applyMiddleware({
  app, path: '/graphql'
});

const PORT = process.env.PORT || 4445;
const httpServer = createServer(app);
httpServer.listen({
  port:PORT
}, (): void =>{
  console.log(`Running at http://127.0.0.1:${PORT}/graphql`);
});