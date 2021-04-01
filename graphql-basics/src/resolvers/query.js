const Query = {
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
};

export default Query;
