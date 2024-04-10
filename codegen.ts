import type { CodegenConfig } from '@graphql-codegen/cli'
const config: CodegenConfig = {
    schema: "src/datasources/schemas/*.graphql",
    documents: ["src/**/*.ts"],
    generates: {
        "./src/datasources/schemas/types/": {
            preset: "client",
            presetConfig: {
                gqlTagName: "gql",
            },
        },
    },
    ignoreNoDocuments: true,
};
export default config