import urlExist from 'url-exist';
import { stripHtml } from 'string-strip-html';
import { signInSchema, signUpSchema } from '../schemas/authSchema.js';
import { usersRepository } from '../repositories/usersRepository.js';

export async function validateSignIn(req, res, next) {
    try {
        const password = req.body.password;
        const email = stripHtml(req.body.email).result.trim();
        const validate = signInSchema.validate({ email, password }, { abortEarly: false });
        if (validate.error) {
            return res.status(422).send({
                message: 'Invalid input',
                detail: validate.error.details.map((e) => e.message).join(', ')
            });
        }
        res.locals.email = email;
        res.locals.password = password;
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).send("Ocorreu um erro ao fazer o login!");
    }
}

export async function findUser(req, res, next) {
    try {
        const email = stripHtml(req.body.email).result.trim();
        const user = await usersRepository.selectUserByEmail(email);
        if (!user.rows.length > 0) {
            return res.status(404).send({
                message: 'User or password is invalid',
                detail: `Ensure to provide a valid email corresponding to a registered user`,
            });
        }
        res.locals.email = email;
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).send("Ocorreu um erro ao fazer o login!");
    }
}

export async function validateSignUp(req, res, next) {
    try {
        const { password, imageURL } = req.body;
        const username = stripHtml(req.body.username).result.trim();
        const email = stripHtml(req.body.email).result.trim();
        const urlExists = await urlExist(imageURL);
        const validate = signUpSchema.validate({ email, password, username, imageURL }, { abortEarly: false });
        if (validate.error || !urlExists) {
            return res.status(422).send({
                message: 'Invalid input',
                detail: validate.error.details.map((e) => e.message).join(', ')
            });
        }
        res.locals.username = username;
        res.locals.email = email;
        res.locals.password = password;
        res.locals.imageURL = imageURL;
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).send("Ocorreu um erro ao cadastrar o usuário!");
    }
}

export async function userIsUnique(_req, res, next) {
    try {
        const { email } = res.locals;
        const user = await usersRepository.selectUserByEmail(email);
        if (user.rows.length > 0) {
            return res.status(409).send({
                message: 'Email already registered',
                detail: 'Ensure to provide an email that is not already registered'
            });
        }
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).send("Ocorreu um erro ao cadastrar o usuário!");
    }
}