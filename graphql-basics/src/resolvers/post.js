const Post = {
  author(parent, args, { db }, info) {
    const authorId = parent.author;
    return db.users.find((user) => user.id === authorId);
  },
  comments(parent, args, { db }, info) {
    const postId = parent.id;
    return db.comments.filter((comment) => comment.post === postId);
  },
};

export default Post;
