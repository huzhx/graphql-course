import { GraphQLServer } from 'graphql-yoga';

// Type definition (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        id: ID!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'hello world';
    },
    name() {
      return 'huzhx';
    },
    id() {
      return 'abc123';
    },
    age() {
      return 23;
    },
    employed() {
      return true;
    },
    gpa() {
      return null;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('The server is up!');
});
