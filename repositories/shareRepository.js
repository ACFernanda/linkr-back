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
    JOIN posts ON posts.id=shares."postId"
    JOIN users ON posts."userId" = users.id
    LEFT JOIN likes ON likes."postId" = posts.id
    WHERE shares."userId" = $1
    GROUP BY posts.id, users.id
    ORDER BY posts."createdAt" DESC;
    `;
    const values = [userId];
    return db.query(query, values);
}

async function selectAllShares(userId) {
    const query = `
    SELECT shares."createdAt", shares."userId" AS "reposterId" , posts.id AS "postId", users.id AS "userId", users.username , users."pictureURL", posts.url, posts.description, posts."urlTitle", posts."urlDescription", posts."urlImage", COUNT(likes.id) AS "countLikes", COUNT(comments.id) AS "countComments"
    FROM posts 
    JOIN shares ON posts.id=shares."postId" and shares."userId" != $1
    JOIN users ON posts."userId" = users.id
    LEFT JOIN follows ON follows."userId"=$1
    LEFT JOIN likes ON posts.id = likes."postId"
    LEFT JOIN comments ON posts.id = comments."postId"
    WHERE follows.following = posts."userId" OR follows.following = shares."userId" 
    GROUP BY posts.id, users.id, shares."userId", shares."createdAt"
    ORDER BY posts."createdAt" DESC
    LIMIT 20;`
    const values = [userId];
    return db.query(query, values);
}

export const shareRepository = {
    insertShare,
    selectUserShares,
    selectAllShares
};