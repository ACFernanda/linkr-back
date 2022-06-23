import db from "../config/db.js";

async function insertShare(postId,userId) {
    const query = `
        INSERT INTO shares ("postId","userId" ) 
        VALUES ($1, $2);
    `;
    const values = [postId,userId];
    return db.query(query, values);
}




export const sessionsRepository = {
    insertShare
};