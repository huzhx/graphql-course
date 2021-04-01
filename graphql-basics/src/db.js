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

const db = {
  users,
  posts,
  comments,
};

export default db;
