import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "../config/db.js";
import { usersRepository } from "../repositories/usersRepository.js";

const SALTS = 10;

export async function signUp(_req, res) {
  const { username, email, password, imageURL } = res.locals;
  const passwordHash = bcrypt.hashSync(password, SALTS);
  
  const newUser = {
    email,
    passwordHash,
    username,
    imageURL
  }
  
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
    const result = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    const user = result.rows[0];

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [
        user.id,
        token,
      ]);
      console.log(`User ${email} signed in successfully`);
      res.status(200).send({ token, user });
    } else {
      return res.sendStatus(401);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
