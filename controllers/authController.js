import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "../config/db.js";

export async function signUp(_req, res) {
    const { username, email, password, imageURL } = res.locals
    const passwordHash = bcrypt.hashSync(password, 10);
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
        await db.query(
            `INSERT INTO users (email, password, username, "pictureURL", "createdAt") VALUES ($1, $2, $3, $4, $5)`,
            [email, passwordHash, username, imageURL, createdAt]
        )
        console.log(`User ${username} registered successfully`);
        return res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;
    try {
        const result = await db.query("SELECT * FROM users WHERE email=$1", [ email ]);
        const user = result.rows[0];
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await db.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [ user.id, token ]);
            console.log(`User ${email} signed in successfully`);
            res.status(200).send(token);
        } else {
            return res.sendStatus(401);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}