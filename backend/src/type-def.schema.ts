import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String
    groups: [Group!]!
  }
  
  type Group {
    id: String!
    name: String!
  }
  
  type Query {
    users: [User!]!
    groups: [Group!]!
    me: User!
  }
  
  type Mutation {
    createUser(firstName: String!, lastName: String!): User!
    initUser(id: Int!, email: String!): User!
  }
`;
