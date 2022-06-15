import db from "./../config/db.js";

export async function tokenValidator(req, res, next) {
  const { authorization } = req.headers;

  const userToken = authorization?.replace("Bearer ", "").trim();
  if (!userToken) {
    return res.sendStatus(401);
  }

  try {
    const session = await db.query(`SELECT * FROM sessions WHERE token=$1`, [
      userToken,
    ]);
    if (!session.rows.length) {
      return res.sendStatus(401);
    }

    res.locals.userId = session.rows[0].userId;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao autorizar!");
  }
}
