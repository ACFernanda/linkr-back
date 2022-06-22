import db from "./../config/db.js";

async function selectHashtagList(){
    const query=`
            SELECT h.name as name
            FROM post_hashtag p
            JOIN hashtags h ON h.id=p."hashtagId"
            GROUP BY name
            ORDER BY COUNT(name) DESC
            LIMIT 10
        ;`
        return db.query(query)
}

async function selectPostsByHashtag(word){
    const query=`
        SELECT p.*, u."pictureURL", u.username
        FROM hashtags h
        JOIN post_hashtag ph ON ph."hashtagId"=h.id
        JOIN posts p ON p.id=ph."postId"
        JOIN users u ON u.id=p."userId"
        WHERE h.name=$1;`
    const values=[word]
    return db.query(query,values)
}

async function getHashtagId(word){
    const query=`
    SELECT id FROM hashtags WHERE name=$1 
    ;`
    const values=[word]
    return db.query(query,values)
}

async function insertHashtag(word){
    const query=`
    INSERT INTO hashtags (name) VALUES ($1) 
    ;`
    const values=[word]
    return db.query(query,values)
}

async function insertPost_Hashtag(postId,hashtagId){
    const query=`
        INSERT INTO post_hashtag ("postId","hashtagId") 
        VALUES ($1,$2)
    ;`
    const values=[postId,hashtagId]
    return db.query(query,values)
}

export const hashtagsRepository = {
    selectHashtagList,
    selectPostsByHashtag,
    getHashtagId,
    insertHashtag,
    insertPost_Hashtag
  };