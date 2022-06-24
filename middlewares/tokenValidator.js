import { sessionsRepository } from "../repositories/sessionsRepository.js";

export async function tokenValidator(req, res, next) {
  const { authorization } = req.headers;

  const userToken = authorization?.replace("Bearer ", "").trim();
  if (!userToken) {
    return res.sendStatus(401);
  }

  try {
    const session = await sessionsRepository.selectSessionByToken(userToken);
    if (!session.rows.length || session.rows[0].active === false) {
      return res.sendStatus(401);
    }

    res.locals.userId = session.rows[0].userId;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao autorizar!");
  }
}
