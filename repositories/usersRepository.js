import db from "../config/db.js";

async function selectAllUsers(userId) {
  const query = `
        SELECT users.id, users.username AS name, users."pictureURL", follows."userId"
        FROM users
        LEFT JOIN follows ON follows."following"=users.id
        ORDER BY CASE WHEN follows."userId"=$1 THEN 0 ELSE 1 END, follows."userId"
    `;

  const values = [userId];

  return db.query(query, values);
}

async function selectUsersByName(username, userId) {
  const formatedName = `${username}%`;
  const query = `
        SELECT users.id, users.username AS name, users."pictureURL", follows."userId"
        FROM users
        LEFT JOIN follows ON follows."following"=users.id
        WHERE username ILIKE $1
        ORDER  BY CASE WHEN follows."userId"=$2 THEN 0 ELSE 1 END, follows."userId";
    `;

  const values = [formatedName, userId];

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
