import fs from 'fs';
import path from "path";

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';

import { gql } from 'graphql-tag';

import { AuthorDataSource } from './datasources'
import { resolvers } from './resolvers'

const schema = gql(fs.readFileSync(path.resolve(__dirname, "./schema.graphql"), 'utf8'));

async function startApolloServer() {
    const server = new ApolloServer({
        schema: buildSubgraphSchema([{ typeDefs: schema, resolvers }])
    });

    const PORT = process.env.PORT || 8080;

    const { url } = await startStandaloneServer(server, {
        context: async () => {
            return {
                dataSources: {
                    authorDS: new AuthorDataSource({ baseURL: "https://router-wn3vwa6nlq-ue.a.run.app" }),
                },
            };
        },
    });

    console.log(`🚀  Server ready at: ${url}`);
}
startApolloServer();