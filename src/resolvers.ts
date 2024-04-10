export const resolvers = {
    Query: {
        authors: async (_, { filter, sort }, { dataSources }, info) =>
            dataSources.authorDS.getAuthors(),
    },
};
