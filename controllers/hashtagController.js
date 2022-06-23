import { hashtagsRepository } from '../repositories/hashtagsRepository.js';
import { likesRepository } from '../repositories/likesRepository.js';
import { postsRepository } from '../repositories/postsRepository.js';

export async function readHashtags(post) {
  const { userId, url, description } = post;
  try {
    let id=post.id
    if(!id){
      const result = await postsRepository.getIdPost(userId, url, description);
      id=result.rows[0].id
    }
    const wordList = description.split(" ");
    for (let k = 0; k < wordList.length; k++) {
      if (wordList[k][0] === "#") {
        createHashtag(id, wordList[k].replace("#", ""));
      }
    }
  } catch (e) {
    console.log(e, "Erro ao ler hashtags do post criado!");
  }
}

export async function deleteHashtags(postId){
  
  try{
    await hashtagsRepository.deletePost_Hashtag(postId)
  }catch(e){
    console.log(e,"Erro ao excluir hashtags do post!")
  }
}

export async function createHashtag(postId, word) {
  try {
    let result = await hashtagsRepository.getHashtagId(word);
    if (result.rowCount === 0) {
      await hashtagsRepository.insertHashtag(word);
      result = await hashtagsRepository.getHashtagId(word);
    }
    const hashtagId = result.rows[0].id;
    await hashtagsRepository.insertPost_Hashtag(postId, hashtagId);
  } catch (e) {
    console.log(e, "Erro ao criar hashtags");
  }
}

export async function getHashtagList(req, res) {
  try {
    const result = await hashtagsRepository.selectHashtagList();
    res.send(result.rows);
  } catch (e) {
    console.log(e, "Erro ao buscar lista de tranding hashtags");
    res.sendStatus(500);
  }
}

export async function getPostsByHashtag(req, res) {
  const { word } = req.params;
  const { userId } = res.locals;
  try {
    const result = await hashtagsRepository.selectPostsByHashtag(word);
    const posts = result.rows;

    const completePosts = [];
    for (let post of posts) {
      const resultLikes = await likesRepository.getLikes(post.postId);
      const likes = resultLikes.rows.map(like => like.username);
      const likedByUser = resultLikes.rows.map(like => like.userId).includes(parseInt(userId));
      completePosts.push({ ...post, likes, likedByUser });
    }

    res.status(200).send(completePosts);
  } catch (e) {
    console.log(e, "Erro ao buscar posts relacionados a hashtag");
    res.sendStatus(500);
  }
}
