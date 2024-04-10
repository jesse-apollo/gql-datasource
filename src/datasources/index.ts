import { GET_AUTHORS } from "./operations";
import { GetAuthorsQuery } from "./types/graphql";
import { GraphQLDataSource } from "./GraphQLDataSource";

export class AuthorDataSource extends GraphQLDataSource {

    public async getAuthors(/* variables */) {
        return this.execute<GetAuthorsQuery>({
          query: GET_AUTHORS, variables:{}
        }).then(({ data, errors }) => {
          // use error logger
          if (errors) {
            throw new Error(errors.map((error) => error.message).join("\n"));
          }
          return data;
        });
      }

}