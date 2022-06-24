import urlMetadata from "url-metadata";
import { deleteHashtags, readHashtags } from "./hashtagController.js";
import { deleteComments } from "./commentController.js";
import { shareRepository } from "../repositories/shareRepository.js";
import { postsRepository } from "../repositories/postsRepository.js";
import { likesRepository } from "../repositories/likesRepository.js";
import { usersRepository } from "../repositories/usersRepository.js";

export async function getAllPosts(req, res) {
  const { userId } = res.locals;

  const {offset} = req.query
  const getMore = offset || 0 ;

  const limit = 20 + getMore
  try {
    const resultPosts = await postsRepository.getAllPosts(userId);
    const resultShares=await shareRepository.selectAllShares(userId)
    
    const usernames=[]
    for(let share of resultShares.rows){
      const resultName=await usersRepository.selectUserById(share.reposterId)
      const username=resultName.rows[0].username
      usernames.push(username)
    }

    const shares=resultShares.rows?.map((obj,index)=>(
        {...obj,
          reposterName:usernames[index]
        }
      ))
      
    const posts = resultPosts.rows;
    for(let share of shares){
      posts.push(share)
    }

    const postsInOrder=[];
    const aside=[]
    let c;let x=0;let a
    for(let k=0;k<posts.length;k++){
      x=0
      while(aside.includes(x)){x++}
      c=posts[x].createdAt
      a=x
      for(let p=0;p<posts.length;p++){
        if(aside.includes(p))continue
        if( posts[p].createdAt > c ){c=posts[p].createdAt;a=p}
      }
      postsInOrder.push(posts[a])
      aside.push(a)
    }

    const completePosts = [];
    for (let post of postsInOrder) {
      const resultLikes = await likesRepository.getLikes(post.postId);
      const likes = resultLikes.rows.map(like => like.username);
      const likedByUser = resultLikes.rows.map(like => like.userId).includes(parseInt(userId));
      completePosts.push({ ...post, likes, likedByUser });
    }

    res.status(200).send(completePosts.slice(0,limit));
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao buscar posts!");
  }
}

export async function publishNewPost(req, res) {
  const { url, description } = req.body;
  const { userId } = res.locals;
  let urlTitle = "";
  let urlDescription = "";
  let urlImage = "";
  let post = { userId, url, description };

  urlMetadata(url).then(
    async function (metadata) {
      console.log(metadata);
      urlTitle = metadata.title;
      urlDescription = metadata.description;
      if (metadata.image.startsWith("http")) {
        urlImage = metadata.image;
      } else if (metadata.image.startsWith("/")) {
        urlImage = metadata.source + metadata.image;
      } else {
        urlImage = metadata.source + "/" + metadata.image;
      }

      post = { ...post, urlTitle, urlDescription, urlImage };

      try {
        await postsRepository.insertNewPost(post);
        readHashtags(post);
        res.sendStatus(201);
      } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao publicar post!");
      }
    },
    function (error) {
      console.log(error);
    }
  );
}

export async function editPost(req, res) {

  const { description } = req.body;
  const { id } = req.params;
  
  const idInteger = parseInt(id);
  const post = { id:idInteger, description };
  try {
    const result = await postsRepository.updatePost(idInteger, description);
    if (result.rowCount != 1) { return res.sendStatus(404); }
    await deleteHashtags(idInteger);
    await readHashtags(post);
    res.sendStatus(200);
  }
  catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  const idInteger = parseInt(id);
  try {
    await likesRepository.deleteAllLikesOfPost(idInteger);
    await deleteHashtags(idInteger);
    await deleteComments(idInteger);
    const result = await postsRepository.deletePostById(idInteger);
    if (result.rowCount != 1) { return res.sendStatus(404); }
    res.sendStatus(200);
  }
  catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
