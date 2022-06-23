import { shareRepository } from "../repositories/shareRepository.js";


export  async function postShare(req, res) {
    const { id } = req.params;
    const { userId } = res.locals;
    const postId=parseInt(id)
  try {
    await shareRepository.insertShare(postId,userId)
    res.sendStatus(200);
  } catch (e) {
    console.log(e, "Erro ao postar comentario!");
    res.sendStatus(500);
  }
}
