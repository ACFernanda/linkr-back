import { usersRepository } from "../repositories/usersRepository.js";

export async function userValidator(req, res, next) {
  const userId = Number(req.params.id);

  if (Number.isNaN(userId) || userId % 1 !== 0) {
    return res.status(422).send("Id should be a integer number");
  }

  try {
    const result = await usersRepository.selectUserById(userId);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    const [requestedUser] = result.rows;
    res.locals.requestedUser = requestedUser;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao validar o usuário requisitado!");
  }
}
