import db from "./../config/db.js";

async function getAllPosts() {
  return db.query(`
  SELECT users.username, users."pictureURL", posts.url, posts.description
  FROM posts 
  JOIN users ON posts."userId" = users.id
  ORDER BY posts."createdAt" DESC
  LIMIT 20;`);
}

export const postsRepository = {
  getAllPosts,
};
