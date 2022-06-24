import db from "./../config/db.js";

async function getAllPosts(userId) {
  return db.query(
    `SELECT posts.id AS "postId", users.id AS "userId", users.username, users."pictureURL", posts.url, posts.description, posts."urlTitle", posts."urlDescription", posts."urlImage", COUNT(DISTINCT(likes.id)) AS "countLikes", COUNT(DISTINCT(comments.id)) AS "countComments", COUNT(DISTINCT(shares.id)) AS "countShares", posts."createdAt"
    FROM posts 
    JOIN users ON posts."userId" = users.id
    LEFT JOIN follows ON follows."userId"=$1
    LEFT JOIN likes ON posts.id = likes."postId"
    LEFT JOIN comments ON posts.id = comments."postId"
    LEFT JOIN shares ON posts.id = shares."postId" 
    WHERE follows.following = posts."userId"
    GROUP BY posts.id, users.id
    ORDER BY posts."createdAt" DESC
    `,
    [userId]
  );
}

async function getUserPosts(userId, offset) {
  return db.query(
    `SELECT posts.id AS "postId", users.id AS "userId", users.username, users."pictureURL", posts."createdAt",
    posts.url, posts.description, posts."urlTitle", posts."urlDescription", posts."urlImage",
    COUNT(DISTINCT(likes.id)) AS "countLikes", COUNT(DISTINCT(comments.id)) AS "countComments", COUNT(DISTINCT(shares.id)) AS "countShares"
    FROM posts 
    JOIN users ON posts."userId" = users.id
    LEFT JOIN likes ON likes."postId" = posts.id
    LEFT JOIN comments ON posts.id = comments."postId"
    LEFT JOIN shares ON posts.id = shares."postId"
    WHERE posts."userId" = $1
    GROUP BY posts.id, users.id
    ORDER BY posts."createdAt" DESC
    LIMIT 10
    OFFSET $2; `,
    [userId, offset*10]
  );
}

async function insertNewPost(post) {
  const { userId, url, description, urlTitle, urlDescription, urlImage } = post;
  return db.query(
    `INSERT INTO posts("userId", url, description, "urlTitle", "urlDescription", "urlImage")
  VALUES($1, $2, $3, $4, $5, $6); `,
    [userId, url, description, urlTitle, urlDescription, urlImage]
  );
}

async function deletePostById(id) {
  return db.query(`
  DELETE FROM posts
  WHERE id = $1;
  ; `,
    [id]
  );
}

async function updatePost(id,description) {
  return db.query(`
    UPDATE posts
    SET description = $2
    WHERE id = $1;
  ; `,
    [id,description]
  );
}
async function getIdPost(userId, url, description ) {
  return db.query(
    `SELECT id FROM posts
    WHERE "userId" = $1 AND url = $2 AND description = $3; `,
    [userId, url, description]
  );
}

export const postsRepository = {
  getAllPosts,
  getUserPosts,
  insertNewPost,
  deletePostById,
  updatePost,
  getIdPost
};
