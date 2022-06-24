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
SELECT  s1."createdAt", posts.id AS "postId" , users.id AS "userId", users.username, users."pictureURL",
    posts.url, posts.description, posts."urlTitle", posts."urlDescription", posts."urlImage",
    COUNT(DISTINCT(likes.id)) AS "countLikes", COUNT(DISTINCT(comments.id)) AS "countComments", COUNT(DISTINCT(s2.id)) AS "countShares"
    FROM posts 
    JOIN shares s1 ON posts.id=s1."postId"
    JOIN users ON posts."userId" = users.id
    LEFT JOIN follows ON follows."userId"=$1
    LEFT JOIN likes ON posts.id = likes."postId"
    LEFT JOIN comments ON posts.id = comments."postId"
    LEFT JOIN shares s2 ON posts.id = s2."postId"
    WHERE s1."userId" = $1
    GROUP BY posts.id, users.id ,s1."createdAt"
    ORDER BY posts."createdAt" DESC;
    `;
    const values = [userId];
    return db.query(query, values);
}

async function selectAllShares(userId) {
    const query = `
    SELECT s1."createdAt", s1."userId" AS "reposterId" , posts.id AS "postId", users.id AS "userId", users.username , users."pictureURL", posts.url, posts.description, posts."urlTitle", posts."urlDescription", posts."urlImage",
    COUNT(likes.id) AS "countLikes", COUNT(comments.id) AS "countComments", COUNT(DISTINCT(s2.id)) AS "countShares"
    FROM posts 
    JOIN shares s1 ON posts.id=s1."postId" and s1."userId" != $1
    JOIN users ON posts."userId" = users.id
    LEFT JOIN follows ON follows."userId"=$1
    LEFT JOIN likes ON posts.id = likes."postId"
    LEFT JOIN comments ON posts.id = comments."postId"
    LEFT JOIN shares s2 ON posts.id = s2."postId"
    WHERE follows.following = posts."userId" OR follows.following = s1."userId" 
    GROUP BY posts.id, users.id, s1."userId", s1."createdAt"
    ORDER BY posts."createdAt" DESC
    `
    const values = [userId];
    return db.query(query, values);
}

export const shareRepository = {
    insertShare,
    selectUserShares,
    selectAllShares
};