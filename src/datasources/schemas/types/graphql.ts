/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/**  An author of a piece of literature.  */
export type Author = {
  __typename?: 'Author';
  /**  The literary awards won by this author.  */
  awards?: Maybe<Array<Maybe<Award>>>;
  /**  A short biography of the author.  */
  biography?: Maybe<Scalars['String']['output']>;
  /**  The books by an author.  */
  books?: Maybe<Array<Maybe<Book>>>;
  /**  The primary key for this author.  */
  id: Scalars['ID']['output'];
  /**  The name of the author.  */
  name: Scalars['String']['output'];
  /**  Where the author was born, if known.  */
  whereBorn?: Maybe<Scalars['String']['output']>;
  /**  The year the author was born.  */
  yearBorn: Scalars['Int']['output'];
  /**  The year the author died (or null if alive). */
  yearDied?: Maybe<Scalars['Int']['output']>;
};

/**  An award for excellence in literature.  */
export type Award = {
  __typename?: 'Award';
  /**  The author who won the award. */
  authorName?: Maybe<Scalars['String']['output']>;
  /**  The name of the award, i.e. 'Hugo Award'. */
  awardName?: Maybe<Scalars['String']['output']>;
  /**  The title of the award, i.e. 'Best Novel'. */
  awardTitle?: Maybe<Scalars['String']['output']>;
  /**  The title of the book that won the award. */
  bookTitle?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use awardTitle for all new clients. */
  title?: Maybe<Scalars['String']['output']>;
  /**  The year that the award was given.  */
  year?: Maybe<Scalars['Int']['output']>;
};

/**  A book (work of literature). */
export type Book = {
  __typename?: 'Book';
  /**  The author of the book.  */
  author?: Maybe<Scalars['String']['output']>;
  /**  The ISBN for a book.  */
  isbn?: Maybe<Scalars['String']['output']>;
  /**  The publication date.  */
  published_date?: Maybe<Scalars['String']['output']>;
  /**  Who published the book.  */
  publisher?: Maybe<Scalars['String']['output']>;
  /**  The title of the book.  */
  title?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**  Create a new author.  */
  addAuthor: Author;
  /**  Create a new review for a book.  */
  addReview: Scalars['Boolean']['output'];
};


export type MutationAddAuthorArgs = {
  biography: Scalars['String']['input'];
  name: Scalars['String']['input'];
  yearBorn: Scalars['Int']['input'];
};


export type MutationAddReviewArgs = {
  bookTitle: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
  review: Scalars['String']['input'];
};

export type Purchase = {
  __typename?: 'Purchase';
  bookTitle?: Maybe<Scalars['String']['output']>;
  cardUsed?: Maybe<Scalars['String']['output']>;
  cost?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /**  Get a list of authors. In REST this might be: /api/v1/authors?filter=&sort=  */
  authors?: Maybe<Array<Maybe<Author>>>;
  /**  Get a list of literary awards. */
  awards?: Maybe<Array<Maybe<Award>>>;
  /**  Get a list of books.  */
  books?: Maybe<Array<Maybe<Book>>>;
  purchases?: Maybe<Array<Maybe<Purchase>>>;
};

export type GetAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorsQuery = { __typename?: 'Query', authors?: Array<{ __typename?: 'Author', name: string, biography?: string | null } | null> | null };


export const GetAuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuthors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"biography"}}]}}]}}]} as unknown as DocumentNode<GetAuthorsQuery, GetAuthorsQueryVariables>;