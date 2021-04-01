import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

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
    post: 'afdsf',
  },
  {
    id: '39203',
    text: 'sfjasoejovjeo',
    author: '2',
    post: 'isofjso',
  },
  {
    id: '3939393',
    text: 'sfiieo',
    author: '1',
    post: 'iiiosd',
  },
  {
    id: '282803',
    text: 'sfjasoejoooeo',
    author: '3',
    post: 'afdsf',
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

    type Mutation {
      createUser(data: CreateUserInput): User!
      createPost(data: CreatePostInput): Post!
      createComment(data: createCommentInput): Comment!
    }

    input CreateUserInput {
      name: String! 
      email: String!
      age: Int
    }

    input CreatePostInput {
      title: String!
      body: String!
      published: Boolean!
      author: ID!
    }

    input createCommentInput {
      text: String!
      author: ID!
      post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.data.email);
      if (emailTaken) {
        throw new Error('Email taken');
      }
      const user = {
        id: uuidv4(),
        ...args.data,
      };
      users.push(user);
      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);
      if (!userExists) {
        throw new Error('User not found');
      }
      const post = {
        id: uuidv4(),
        ...args.data,
      };
      posts.push(post);
      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);
      if (!userExists) {
        throw new Error('User not found');
      }
      const postExists = posts.some((post) => post.id === args.data.post);
      if (!postExists) {
        throw new Error('Post not found');
      }
      const post = posts.find((post) => post.id === args.data.post);
      if (!post.published) {
        throw new Error('Post not published');
      }
      const comment = {
        id: uuidv4(),
        ...args.data,
      };
      comments.push(comment);
      return comment;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      const authorId = parent.author;
      return users.find((user) => user.id === authorId);
    },
    comments(parent, args, ctx, info) {
      const postId = parent.id;
      return comments.filter((comment) => comment.post === postId);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      const authorId = parent.author;
      return users.find((user) => user.id === authorId);
    },
    post(parent, args, ctx, info) {
      const postId = parent.post;
      return posts.find((post) => post.id === postId);
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
