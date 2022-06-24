import db from "../config/db.js";

async function selectSessionByToken(token) {
  const query = `
        SELECT * FROM sessions WHERE token=$1
    `;
  const values = [token];
  return db.query(query, values);
}

async function insertNewSession(userId, token) {
  const query = `
        INSERT INTO sessions ("userId", token) 
        VALUES ($1, $2);
    `;
  const values = [userId, token];
  return db.query(query, values);
}

async function updateSessionStatus(token) {
  const query = `
        UPDATE sessions SET active='false' WHERE token = $1;
    `;
  const values = [token];
  return db.query(query, values);
}

export const sessionsRepository = {
  selectSessionByToken,
  insertNewSession,
  updateSessionStatus,
};
