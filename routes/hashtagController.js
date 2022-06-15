import db from '../config/db.js'
export async function createHashtag(postId,word){
    try{
        let result=await db.query(`
            SELECT id 
            FROM hashtags
            WHERE name=$1
        ;`,[word])
        if(result.rowCount===0){
            await db.query(`
                INSERT INTO hashtags (name) 
                VALUES ($1)
            ;`,[word])
            result=await db.query(`
                SELECT id 
                FROM hashtags
                WHERE name=$1
            ;`,[word])
        }
        await db.query(`
            INSERT INTO post_hashtag ("postId","hashtagId") 
            VALUES ($1,$2)
        ;`,[postId,result.rows[0].id])
    }catch(e){
        console.log(e)
    }
}
export async function getHashtagList(req,res){
    try{
        const result=await db.query(`
            SELECT h.name as name
            FROM post_hashtag p
            JOIN hashtags h ON h.id=p."hashtagId"
            GROUP BY name
            ORDER BY COUNT(name) DESC
            LIMIT 10
        ;`)
        if(result.rowCount===0){return res.sendStatus(500)}
        res.send(result.rows)
    }catch(e){
        res.sendStatus(500)
        console.log(e)
    }
}
export async function getPostsByHashtag(req,res){
    const {word}=req.params
    try{
        const result=await db.query(`
            SELECT p.*
            FROM hashtags h
            JOIN post_hashtag ph ON ph."hashtagId"=h.id
            JOIN posts p ON p.id=ph."postId"
            WHERE h.name=$1
        ;`,[word])
        res.send(result.rows)
    }catch{
        res.sendStatus(500)
    }
}


