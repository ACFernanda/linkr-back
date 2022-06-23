import db from "../config/db.js";

async function selectAllUsers(userId) {
  const user = `{"${userId}"}`;
  const query = `
        SELECT u.id, u.username AS name, u."pictureURL", array_agg(follows."userId") AS followers
        FROM users u
        LEFT JOIN follows ON follows."following"=u.id
        GROUP BY u.id, u.username, u."pictureURL"
        ORDER BY CASE WHEN array_agg(follows."userId") @> $1 THEN 0 ELSE 1 END, array_agg(follows."userId")
    `;

  const values = [user];

  return db.query(query, values);
}

async function selectUsersByName(username, userId) {
  const formatedName = `${username}%`;
  const user = `{"${userId}"}`;
  const query = `
        SELECT u.id, u.username AS name, u."pictureURL", array_agg(follows."userId") AS followers
        FROM users u
        LEFT JOIN follows ON follows."following"=u.id
        WHERE username ILIKE $1
        GROUP BY u.id, u.username, u."pictureURL"
        ORDER BY CASE WHEN array_agg(follows."userId") @> $2 THEN 0 ELSE 1 END, array_agg(follows."userId")
    `;

  const values = [formatedName, user];

  return db.query(query, values);
}

async function selectUserById(userId) {
  const query = `
        SELECT * 
        FROM users
        WHERE id = $1 
    `;

  const values = [userId];

  return db.query(query, values);
}

async function selectUserByEmail(email) {
  const query = `
        SELECT * 
        FROM users
        WHERE email = $1
    `;

  const values = [email];
  return db.query(query, values);
}

async function insertNewUser(user) {
  const { username, email, passwordHash, imageURL } = user;
  const query = `
        INSERT INTO users (email, password, username, "pictureURL") 
        VALUES ($1, $2, $3, $4);
    `;

  const values = [email, passwordHash, username, imageURL];
  return db.query(query, values);
}

export const usersRepository = {
  selectAllUsers,
  selectUsersByName,
  selectUserById,
  selectUserByEmail,
  insertNewUser,
};
