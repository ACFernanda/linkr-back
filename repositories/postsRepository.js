import db from "./../config/db.js";

async function getAllPosts() {
  return db.query(
    `
    SELECT users.username, users."pictureURL", posts.url, posts.description, posts."urlTitle", posts."urlDescription", posts."urlImage"
    FROM posts 
    JOIN users ON posts."userId" = users.id
    ORDER BY posts."createdAt" DESC
    LIMIT 20;`
  );
}

async function insertNewPost(post) {
  const { userId, url, description, urlTitle, urlDescription, urlImage } = post;
  return db.query(
    `
    INSERT INTO posts ("userId", url, description, "urlTitle", "urlDescription", "urlImage")
    VALUES ($1, $2, $3, $4, $5, $6);`,
    [userId, url, description, urlTitle, urlDescription, urlImage]
  );
}

export const postsRepository = {
  getAllPosts,
  insertNewPost,
};
