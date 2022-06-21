import db from "../config/db.js";{getMessages,postMessage}
export async function postMessage(req, res) {
    const { postId } = req.params;
    const { userId } = res.locals;
    const {text}=req.body;
  try {
    await db.query(
      `
      INSERT INTO messages ("userId","postId",text)
      VALUES ($1,$2,$3)
      ;`,
      [userId,parseInt(postId),text]
    );
    res.sendStatus(200);
  } catch (e) {
    console.log(e, "Erro ao postar mensagem!");
    res.sendStatus(500);
  }
}
export async function getMessages(req, res) {
    const { postId } = req.params;
  try {
    const result = await db.query(
      `
      SELECT u.username, u."pictureURL", m."userId", m.text
      FROM messages m
      JOIN users u ON u.id=m."userId"

      WHERE m."postId"=$1
      ;`,
      [parseInt(postId)]
    );
    res.send(result.rows);
  } catch (e) {
    console.log(e, "Erro ao buscar mensagens!");
    res.sendStatus(500);
  }
}
