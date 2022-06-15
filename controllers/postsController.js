import urlMetadata from "url-metadata";

import { postsRepository } from "../repositories/postsRepository.js";

export async function getAllPosts(req, res) {
  try {
    const result = await postsRepository.getAllPosts();
    res.status(200).send(result.rows);
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

  urlMetadata(url).then(
    function (metadata) {
      console.log(metadata);
      urlTitle = metadata.title;
      urlDescription = metadata.description;
      urlImage = metadata.image;
    },
    function (error) {
      console.log(error);
    }
  );

  const post = { userId, url, description, urlTitle, urlDescription, urlImage };

  try {
    await postsRepository.insertNewPost(post);
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao publicar post!");
  }
}
