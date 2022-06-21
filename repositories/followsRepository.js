import db from "./../config/db.js";

async function followUser(userId, followUserId) {
  return db.query(
    `
    INSERT INTO follows ("userId", "following") VALUES ($1, $2);`,
    [userId, followUserId]
  );
}

async function unfollowUser(userId, unfollowUser) {
  return db.query(
    `
    DELETE FROM follows WHERE "userId" = $1 AND "following" = $2;`,
    [userId, unfollowUser]
  );
}

async function getIfUserFollows(userId, profileUserId) {
  return db.query(
    `SELECT * FROM follows WHERE "userId" = $1 AND "following" = $2`,
    [userId, profileUserId]
  );
}

export const followsRepository = {
  followUser,
  unfollowUser,
  getIfUserFollows,
};
