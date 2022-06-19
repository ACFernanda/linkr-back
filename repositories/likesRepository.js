import db from "./../config/db.js";

async function likePost(userId, postId) {
  return db.query(
    `
    INSERT INTO likes ("userId", "postId") VALUES ($1, $2);`,
    [userId, postId]
  );
}

async function dislikePost(userId, postId) {
  return db.query(
    `
    DELETE FROM likes WHERE "userId" = $1 AND "postId" = $2;`,
    [userId, postId]
  );
}

async function getLikes(postId) {
  return db.query(
    `
    SELECT users.id AS "userId", users.username
    FROM likes
    JOIN users ON likes."userId" = users.id
    WHERE "postId"=$1`,
    [postId]
  );
}

export const likesRepository = {
  likePost,
  dislikePost,
  getLikes,
};
