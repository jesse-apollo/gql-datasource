import gql from "graphql-tag";

export const GET_AUTHORS = gql`
query GetAuthors {
  authors {
    name
    biography
  }
}`

export const GET_BOOKS = gql`
query GetBooks {
  books {
    title
  }
}`