import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    firstName: String!
    lastName: String!
    groups: [Group!]!
  }
  
  type Group {
    id: String!
    name: String!
  }
  
  type Query {
    users: [User!]!
    me: User!
  }
`;
