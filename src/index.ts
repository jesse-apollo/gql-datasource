import fs from 'fs';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';

import { gql } from 'graphql-tag';
import { AuthorDataSource } from './datasources'
import { resolvers } from './resolvers'

const schema = gql(fs.readFileSync('../schema.graphql', 'utf8'));

const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs: schema, resolvers }])
});

const PORT = process.env.PORT || 8080;

const { url } = await startStandaloneServer(server, {
    context: async () => {
        return {
            dataSources: {
                authorDS: new AuthorDataSource(),
            },
        };
    },
});

console.log(`🚀  Server ready at: ${url}`);