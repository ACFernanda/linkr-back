import { shareRepository } from "../repositories/shareRepository.js";


export  async function postShare(req, res) {
    const { id } = req.params;
    const { userId } = res.locals;
    const postId=parseInt(id)
  try {
    await shareRepository.insertShare(postId,userId)
    console.log('inserido')
    res.sendStatus(200);
  } catch (e) {
    console.log(e, "Erro ao postar re-post!");
    res.sendStatus(500);
  }
}
