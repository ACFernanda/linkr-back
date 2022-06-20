import Joi from 'joi';

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    imageURL: Joi.string().uri().required()
});

export { signInSchema, signUpSchema };