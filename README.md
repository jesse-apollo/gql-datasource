# GraphQL Datasource

This repository demonstrates a GraphQL datasource that you can use as
part of your Apollo Server to connect to down-stream GraphQL endpoints.

This is sometimes helpful if you need to merge responses from multiple
GQL endpoints or if you need to wrap a non-federated GQL endpoint within
a Federated subgraph.

## Installation

Install dependencies...
`npm install`

Compile schema types...
`npm run generate`

## Run server

`npm run start`

## Basic usage

The included schema in `src/schema.graphql` will be used for the subgraph.

The schemas in `src/datasources/schemas` will be used for the down-stream GQL
servers that you are communicating with using the DataSource.  Add downstream
schemas to this directory. 

Add new GQL operations to `src/datasources/schemas/operations.ts`.

Import those and use them as methods in `src/datasources/YourDataSource.ts` see
`AuthorDataSource.ts` for an example.
