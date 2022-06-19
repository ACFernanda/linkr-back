import bcrypt from 'bcrypt';
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
                message: 'Email is already in use',
                detail: validate.error.details.map((e) => e.message).join(', ')
            });
        }
        res.locals.email = email;
        res.locals.password = password;
        console.log(`Valid sign in input`);
        next();
    } catch (e) {
        next(e);
    }
}

export async function findUser(req, res, next) {
    try {
        const email = stripHtml(req.body.email).result.trim();
        const user = await usersRepository.selectUsersByName(email); // ????
        if (!user) {
            return res.status(404).send({
                message: 'User not found',
                detail: `Ensure to provide a valid email corresponding to a registered user`,
            });
        }
        res.locals.email = email;
        console.log(`User found`);
        next();
    } catch (e) {
        next(e);
    }
}

export async function validatePassword(req, res, next) {
    try {
        const password = req.body.password;
        const { email } = res.locals;
        if (!bcrypt.compareSync(password, email.password)) {
            return res.status(401).send({
                message: 'Invalid password',
                detail: 'Ensure to provide a valid password',
            });
        }
        console.log(`Valid password`);
        next();
    } catch (e) {
        next(e);
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
        console.log(`Valid sign up input`);
        next();
    } catch (e) {
        next(e);
    }
}

export async function userIsUnique(_req, res, next) {
    try {
        const { email } = res.locals;
        const user = await usersRepository.selectUsersByName(email);
        if (user) {
            return res.status(409).send({
                message: 'Email already registered',
                detail: 'Ensure to provide an username that is not already registered'
            });
        }
        console.log(`User is unique`);
        next();
    } catch (e) {
        next(e);
    }
}