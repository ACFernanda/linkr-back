import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { sessionsRepository } from "../repositories/sessionsRepository.js";
import { usersRepository } from "../repositories/usersRepository.js";

const SALTS = 10;

export async function signUp(_req, res) {
  const { username, email, password, imageURL } = res.locals;
  const passwordHash = bcrypt.hashSync(password, SALTS);

  const newUser = {
    email,
    passwordHash,
    username,
    imageURL,
  };

  try {
    await usersRepository.insertNewUser(newUser);
    return res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao cadastrar o usuário!");
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const result = await usersRepository.selectUserByEmail(email);
    const user = result.rows[0];

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await sessionsRepository.insertNewSession(user.id, token);
      res.status(200).send({ token, user });
    } else {
      return res.status(401).send({
        message: "User or password is invalid",
        detail: `Ensure to provide the correct password`,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao fazer o login!");
  }
}

export async function desactivateToken(req, res) {
  const { authorization } = req.headers;

  const userToken = authorization?.replace("Bearer ", "").trim();
  if (!userToken) {
    return res.sendStatus(401);
  }

  try {
    const result = await sessionsRepository.updateSessionStatus(userToken);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao fazer o logout!");
  }
}
