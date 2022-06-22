import db from "../config/db.js";
import { commentRepository } from "../repositories/commentRepository.js";


export async function postComment(req, res) {
    const { postId } = req.params;
    const { userId } = res.locals;
    const {text}=req.body;
  try {
    await commentRepository.insertComment(userId,parseInt(postId),text)
    res.sendStatus(200);
  } catch (e) {
    console.log(e, "Erro ao postar comentario!");
    res.sendStatus(500);
  }
}
export async function getComments(req, res) {
    const { postId } = req.params;
  try {
    const result = await commentRepository.selectComments(parseInt(postId))
    res.send(result.rows);
  } catch (e) {
    console.log(e, "Erro ao buscar comentarios!");
    res.sendStatus(500);
  }
}
