import { GraphQLServer } from 'graphql-yoga';

// Demo user data
const users = [
  {
    id: '1',
    name: 'huzhx',
    email: 'huzhx@example.com',
    age: 28,
  },
  {
    id: '2',
    name: 'sarah',
    email: 'sarah@example.com',
  },
  {
    id: '3',
    name: 'mike',
    email: 'mike@example.com',
  },
];

// Demo post data
const posts = [
  {
    id: 'afdsf',
    title: 'fjiaosjfo',
    body: 'sifasodfsaodfijsodjfs',
    published: true,
    author: '1',
  },
  {
    id: 'isofjso',
    title: 'jsiofjsofjso',
    body: 'sjosjfisodjfsjlfijsodjfs',
    published: false,
    author: '1',
  },
  {
    id: 'iiiosd',
    title: 'jslfsfs.fso',
    body: 'sifasodijsfosjfosfjmlsfijsodjfs',
    published: true,
    author: '3',
  },
];

// Demo comment data
const comments = [
  {
    id: '83',
    text: '3829r2793r',
    author: '1',
  },
  {
    id: '39203',
    text: 'sfjasoejovjeo',
    author: '2',
  },
  {
    id: '3939393',
    text: 'sfiieo',
    author: '1',
  },
  {
    id: '282803',
    text: 'sfjasoejoooeo',
    author: '3',
  },
];

// Type definition (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        posts(query: String): [Post!]!
        post: Post!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (args.query) {
        return users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase()));
      }
      return users;
    },
    me() {
      return {
        id: '123098',
        name: 'huzx',
        email: 'huzhx@example.com',
        age: 28,
      };
    },
    posts(parent, args, ctx, info) {
      if (args.query) {
        return posts.filter((post) => {
          const titleMatched = post.title.toLowerCase().includes(args.query.toLowerCase());
          const bodyMatched = post.body.toLowerCase().includes(args.query.toLowerCase());
          return titleMatched || bodyMatched;
        });
      }
      return posts;
    },
    post() {
      return {
        id: 'p238r1',
        title: 'test',
        body: 'this is a test',
        published: true,
      };
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      const authorId = parent.author;
      return users.find((user) => user.id === authorId);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      const authorId = parent.author;
      return users.find((user) => user.id === authorId);
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
