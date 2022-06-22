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
    const {id}=req.query
  try {
    const result = await commentRepository.selectComments(parseInt(postId),id)
    res.send(result.rows);
  } catch (e) {
    console.log(e, "Erro ao buscar comentarios!");
    res.sendStatus(500);
  }
}

export async function deleteComments(postId) {
try {
   await commentRepository.deleteCommentsOfPost(postId)
} catch (e) {
  console.log(e, "Erro ao deletar comentarios!");
}
}
