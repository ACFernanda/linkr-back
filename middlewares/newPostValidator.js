import newPostSchema from "../schemas/newPostSchema.js";

export function newPostValidator(req, res, next) {
  const post = req.body;
  const validation = newPostSchema.validate(post);
  if (validation.error) {
    return res.status(422).send(validation.error.details.map((detail) => detail.message));
  }

  next();
}
