import urlMetadata from "url-metadata";
import { deleteHashtags, readHashtags } from "./hashtagController.js";
import { deleteComments } from "./commentController.js";

import { postsRepository } from "../repositories/postsRepository.js";
import { likesRepository } from "../repositories/likesRepository.js";

export async function getAllPosts(req, res) {
  const { userId } = res.locals;
  let offset = req.query.offset;
  offset = offset || 0;

  try {
    const resultPosts = await postsRepository.getAllPosts(userId, offset);
    const posts = resultPosts.rows;

    const completePosts = [];
    for (let post of posts) {
      const resultLikes = await likesRepository.getLikes(post.postId);
      const likes = resultLikes.rows.map(like => like.username);
      const likedByUser = resultLikes.rows.map(like => like.userId).includes(parseInt(userId));
      completePosts.push({ ...post, likes, likedByUser });
    }

    res.status(200).send(completePosts);
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
