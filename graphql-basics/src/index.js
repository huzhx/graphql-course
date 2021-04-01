import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
import db from './db';

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, { db }, info) {
      if (args.query) {
        return users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase()));
      }
      return db.users;
    },
    me() {
      return {
        id: '123098',
        name: 'huzx',
        email: 'huzhx@example.com',
        age: 28,
      };
    },
    posts(parent, args, { db }, info) {
      if (args.query) {
        return db.posts.filter((post) => {
          const titleMatched = post.title.toLowerCase().includes(args.query.toLowerCase());
          const bodyMatched = post.body.toLowerCase().includes(args.query.toLowerCase());
          return titleMatched || bodyMatched;
        });
      }
      return db.posts;
    },
    post() {
      return {
        id: 'p238r1',
        title: 'test',
        body: 'this is a test',
        published: true,
      };
    },
    comments(parent, args, { db }, info) {
      return db.comments;
    },
  },
  Mutation: {
    createUser(parent, args, { db }, info) {
      const emailTaken = db.users.some((user) => user.email === args.data.email);
      if (emailTaken) {
        throw new Error('Email taken');
      }
      const user = {
        id: uuidv4(),
        ...args.data,
      };
      db.users.push(user);
      return user;
    },
    deleteUser(parent, args, { db }, info) {
      const userIndex = db.users.findIndex((user) => user.id === args.id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      // detele the user
      const user = db.users.splice(userIndex, 1)[0];
      // delete the posts of the user
      db.posts = db.posts.filter((post) => {
        const match = post.author === user.id;
        if (match) {
          db.comments = db.comments.filter((comment) => comment.post !== post.id);
        }
        return !match;
      });
      // delete the comments of the user
      db.comments = db.comments.filter((comment) => comment.author !== user.id);
      return user;
    },
    createPost(parent, args, { db }, info) {
      const userExists = db.users.some((user) => user.id === args.data.author);
      if (!userExists) {
        throw new Error('User not found');
      }
      const post = {
        id: uuidv4(),
        ...args.data,
      };
      db.posts.push(post);
      return post;
    },
    createComment(parent, args, { db }, info) {
      const userExists = db.users.some((user) => user.id === args.data.author);
      if (!userExists) {
        throw new Error('User not found');
      }
      const postExists = db.posts.some((post) => post.id === args.data.post);
      if (!postExists) {
        throw new Error('Post not found');
      }
      const post = db.posts.find((post) => post.id === args.data.post);
      if (!post.published) {
        throw new Error('Post not published');
      }
      const comment = {
        id: uuidv4(),
        ...args.data,
      };
      db.comments.push(comment);
      return comment;
    },
  },
  Post: {
    author(parent, args, { db }, info) {
      const authorId = parent.author;
      return db.users.find((user) => user.id === authorId);
    },
    comments(parent, args, { db }, info) {
      const postId = parent.id;
      return db.comments.filter((comment) => comment.post === postId);
    },
  },
  User: {
    posts(parent, args, { db }, info) {
      return db.posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, { db }, info) {
      const authorId = parent.author;
      return db.users.find((user) => user.id === authorId);
    },
    post(parent, args, { db }, info) {
      const postId = parent.post;
      return db.posts.find((post) => post.id === postId);
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
  },
});

server.start(() => {
  console.log('The server is up!');
});
