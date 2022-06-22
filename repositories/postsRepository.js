import db from "./../config/db.js";

async function getAllPosts(userId) {
  return db.query(
    `
    SELECT posts.id AS "postId", users.id AS "userId", users.username, users."pictureURL", posts.url, posts.description, posts."urlTitle", posts."urlDescription", posts."urlImage", COUNT(likes.id) AS "countLikes",COUNT(comments.id) AS "countComments"
    FROM posts 
    JOIN users ON posts."userId" = users.id
    LEFT JOIN follows ON follows."userId"=$1
    LEFT JOIN likes ON posts.id = likes."postId"
    LEFT JOIN comments ON posts.id = comments."postId"
    WHERE follows.following = posts."userId" OR posts."userId"=$2
    GROUP BY posts.id, users.id
    ORDER BY posts."createdAt" DESC
    LIMIT 20;`,
    [userId, userId]
  );
}

async function getUserPosts(userId) {
  return db.query(
    `
    SELECT users.id AS "userId", users.username, users."pictureURL", posts.url, posts.description, posts."urlTitle", posts."urlDescription", posts."urlImage"
    FROM posts 
    JOIN users ON posts."userId" = users.id
    WHERE posts."userId" = $1
    ORDER BY posts."createdAt" DESC;`,
    [userId]
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

async function getIdPost(userId, url, description) {
  return db.query(
    `
    SELECT id FROM posts
    WHERE "userId"=$1 AND url=$2 AND description=$3
;`,
    [userId, url, description]
  );
}

export const postsRepository = {
  getAllPosts,
  getUserPosts,
  insertNewPost,
  getIdPost,
};
