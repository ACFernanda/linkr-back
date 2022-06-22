import db from "../config/db.js";
async function insertComment(userId,postId,text) {
    const query = `
        INSERT INTO comments ("userId","postId",text)
        VALUES ($1,$2,$3)
    ;`

    const values = [userId,postId,text];
    return db.query(query, values);
}

async function selectComments(postId,myUserId) {
    const query = `
        SELECT c.id, u.username,u."pictureURL", c."userId", c.text, f.id AS following
        FROM comments c
        JOIN users u ON u.id=c."userId"
        LEFT JOIN follows f ON f."userId"=$2 AND f.following=c."userId"
        
        WHERE c."postId"=$1
    ;`
    const values = [postId,myUserId];
    return db.query(query, values);
}

export const commentRepository = {
    insertComment,
    selectComments
};
