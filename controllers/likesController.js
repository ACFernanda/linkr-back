import { likesRepository } from "../repositories/likesRepository.js";

export async function likePost(req, res) {
  const { userId } = res.locals;
  const { postId } = req.body;
  try {
    await likesRepository.likePost(userId, postId);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao curtir post!");
  }
}

export async function dislikePost(req, res) {
  const { userId } = res.locals;
  const { postId } = req.body;
  try {
    await likesRepository.dislikePost(userId, postId);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao descutir post!");
  }
}
