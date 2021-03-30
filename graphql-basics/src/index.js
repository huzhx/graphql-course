import { GraphQLServer } from 'graphql-yoga';

// Type definition (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
        greeting(name: String): String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: '123098',
        name: 'huzx',
        email: 'huzhx@example.com',
        age: 28,
      };
    },
    post() {
      return {
        id: 'p238r1',
        title: 'test',
        body: 'this is a test',
        published: true,
      };
    },
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello, ${args.name}`;
      }
      return 'Hello!';
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
