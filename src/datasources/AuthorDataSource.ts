import { GET_AUTHORS, GET_BOOKS } from "./schemas/operations";
import { GetAuthorsQuery, GetBooksQuery } from "./schemas/types/graphql";
import { GraphQLDataSource } from "./GraphQLDataSource";
import { GraphQLRequest } from "@apollo/client/core";

export class AuthorDataSource extends GraphQLDataSource {

  public async getAuthors(/* variables */) {
    return this.execute<GetAuthorsQuery>({
      query: GET_AUTHORS, variables: {}
    }).then(({ data, errors }) => {
      // use error logger
      if (errors) {
        throw new Error(errors.map((error) => error.message).join("\n"));
      }
      return data.authors;
    });
  }

  public async getBooks(/* variables */) {
    return this.execute<GetBooksQuery>({
      query: GET_BOOKS, variables: {}
    }).then(({ data, errors }) => {
      // use error logger
      if (errors) {
        throw new Error(errors.map((error) => error.message).join("\n"));
      }
      return data.books;
    });
  }

  public async willSendRequest(request: any) {
    if (!request.headers) {
      request.headers = {};
    }
    request.headers["x-api-key"] = "this is my key";
  }

}