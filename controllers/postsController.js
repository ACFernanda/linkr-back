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
