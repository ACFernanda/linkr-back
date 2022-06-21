import { followsRepository } from "../repositories/followsRepository.js";

export async function followUser(req, res) {
  const { userId } = res.locals;
  const { followUserId } = req.body;
  try {
    await followsRepository.followUser(userId, followUserId);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao seguir usuário!");
  }
}

export async function unfollowUser(req, res) {
  const { userId } = res.locals;
  const { unfollowUserId } = req.body;
  try {
    await followsRepository.unfollowUser(userId, unfollowUserId);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao deixar de seguir usuário!");
  }
}
