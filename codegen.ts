import type { CodegenConfig } from '@graphql-codegen/cli'
const config: CodegenConfig = {
    schema: "src/schema.graphql",
    documents: ["src/**/*.ts"],
    generates: {
        "./src/datasources/types/": {
            preset: "client",
            presetConfig: {
                gqlTagName: "gql",
            },
        },
    },
    ignoreNoDocuments: true,
};
export default config