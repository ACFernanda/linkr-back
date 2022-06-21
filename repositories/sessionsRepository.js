import db from "../config/db.js";

async function insertNewSession(userId, token) {
    const query = `
        INSERT INTO sessions ("userId", token) 
        VALUES ($1, $2);
    `;
    const values = [userId, token];
    return db.query(query, values);
}

export const sessionsRepository = {
    insertNewSession
};