import db from "../config/db.js";
import {hashtagsRepository} from '../repositories/hashtagsRepository.js'

export async function readHashtags(post) {
  const { userId, url, description } = post;
  try {
    const result = await db.query(
      `
            SELECT id FROM posts
            WHERE "userId"=$1 AND url=$2 AND description=$3
        ;`,
      [userId, url, description]
    );
    const wordList = description.split(" ");
    for (let k = 0; k < wordList.length; k++) {
      if (wordList[k][0] === "#") {
        createHashtag(result.rows[0].id, wordList[k].replace("#", ""));
      }
    }
  } catch (e) {
    console.log(e, "Erro ao ler hashtags do post criado");
  }
}
export async function createHashtag(postId, word) {
  try {
    let result = await db.query(
      `SELECT id FROM hashtags WHERE name=$1 ;`,[word]);
    if (result.rowCount === 0) {
      await db.query(
        `INSERT INTO hashtags (name) VALUES ($1) ;`,[word]);
      result = await db.query(
        `SELECT id FROM hashtags WHERE name=$1; `,[word]);
    }
    
    await db.query(
      `
            INSERT INTO post_hashtag ("postId","hashtagId") 
            VALUES ($1,$2)
        ;`,
      [postId, result.rows[0].id]
    );
  } catch (e) {
    console.log(e, "Erro ao criar hashtags");
  }
}
export async function getHashtagList(req, res) {
  try {
    const result = await hashtagsRepository.selectHashtagList()
    if (result.rowCount === 0) {
      return res.sendStatus(500);
    }
    res.send(result.rows);
  } catch (e) {
    console.log(e, "Erro ao buscar lista de tranding hashtags");
    res.sendStatus(500);
  }
}
export async function getPostsByHashtag(req, res) {
  const { word } = req.params;
  try {
    const result = await hashtagsRepository.selectPostsByHashtag(word)
    res.send(result.rows);
  } catch (e) {
    console.log(e, "Erro ao buscar posts relacionados a hashtag");
    res.sendStatus(500);
  }
}
