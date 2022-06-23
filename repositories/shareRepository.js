import db from "../config/db.js";

async function insertShare(postId,userId) {
    const query = `
        INSERT INTO shares ("postId","userId" ) 
        VALUES ($1, $2);
    `;
    const values = [postId,userId];
    return db.query(query, values);
}

async function selectUserShares(userId) {
    const query = `
SELECT  posts.id AS "postId" , users.id AS "userId", users.username, users."pictureURL",
    posts.url, posts.description, posts."urlTitle", posts."urlDescription", posts."urlImage",
    COUNT(likes.id) AS "countLikes"
    FROM shares 
    join posts on posts.id=shares."postId"
    JOIN users ON posts."userId" = users.id
    LEFT JOIN likes ON likes."postId" = posts.id
    WHERE shares."userId" = $1
    GROUP BY posts.id, users.id
    ORDER BY posts."createdAt" DESC;
    `;
    const values = [userId];
    return db.query(query, values);
}


export const shareRepository = {
    insertShare,
    selectUserShares
};