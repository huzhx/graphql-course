const Comment = {
  author(parent, args, { db }, info) {
    const authorId = parent.author;
    return db.users.find((user) => user.id === authorId);
  },
  post(parent, args, { db }, info) {
    const postId = parent.post;
    return db.posts.find((post) => post.id === postId);
  },
};

export default Comment;
