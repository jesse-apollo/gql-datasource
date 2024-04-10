
import { DocumentNode, GraphQLError } from "graphql";
import { createHttpLink, execute, from, toPromise, ApolloError, GraphQLRequest } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

import type { KeyValueCache } from '@apollo/utils.keyvaluecache';

export interface GraphQLResponse<T> {
    data?: T;
    errors?: GraphQLError[];
}

export interface DataSourceConfig {
    baseURL: string
}

export class GraphQLDataSource<TContext = any> {
    public baseURL!: string;

    constructor(config?: DataSourceConfig) {
        this.baseURL = config?.baseURL
    }

    async query(query: DocumentNode) {
        const link = this.composeLinks();
        try {
            const response = await toPromise(execute(link, { query }));
            return response;
        } catch (error) {
            this.didEncounterError(error);
        }
    }

    public async execute<T>(operation: GraphQLRequest): Promise<GraphQLResponse<T>> {
        return this.executeSingleOperation(operation) as Promise<
            GraphQLResponse<T>
        >;
    }

    private async executeSingleOperation(operation: GraphQLRequest) {
        const link = this.composeLinks();
        const response = await toPromise(execute(link, operation));
        
        if (response.errors) {
            this.didEncounterError(response.errors);
        }

        return response;
    }

    didEncounterError(error: any) {
        const status = error.statusCode ? error.statusCode : null;
        const message = error.bodyText ? error.bodyText : null;
        let apolloError: ApolloError;
        switch (status) {
            case 401:
                apolloError = new ApolloError(message);
                break;
            case 403:
                apolloError = new ApolloError(message);
                break;
            case 502:
                apolloError = new ApolloError({ errorMessage: "Bad Gateway" });
                break;
            default:
                apolloError = new ApolloError(message);
        }
        throw apolloError;
    }

    resolveUri() {
        const baseURL = this.baseURL;
        if (!baseURL) {
            throw new ApolloError(
                { errorMessage: "Cannot make request to GraphQL API, missing baseURL" }
            );
        }
        return baseURL;
    }
    composeLinks() {
        const uri = this.resolveUri();
        return from([
            this.onErrorLink(),
            this.onRequestLink(),
            /* @ts-ignore-next-line */
            createHttpLink({ fetch, uri })
        ]);
    }

    onErrorLink() {
        return onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.map(graphqlError =>
                    console.error(`[GraphQL error]: ${graphqlError.message}`)
                );
            }
            if (networkError) {
                console.log(`[Network Error]: ${networkError}`);
            }
        });
    }

    onRequestLink() {
        return setContext(request => {
            if (typeof (this as any).willSendRequest === "function") {
                (this as any).willSendRequest(request);
            }
            return request;
        });
    }

}