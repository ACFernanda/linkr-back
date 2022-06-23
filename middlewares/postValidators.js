import {newPostSchema,editPostSchema} from "../schemas/postSchemas.js";

export function newPostValidator(req, res, next) {
  const post = req.body;
  const validation = newPostSchema.validate(post);
  if (validation.error) {
    return res.status(422).send(validation.error.details.map((detail) => detail.message));
  }

  next();
}
export function editPostValidator(req, res, next) {
  const body = req.body;
  const validation = editPostSchema.validate(body);
  if (validation.error) {
    return res.status(422).send(validation.error.details.map((detail) => detail.message));
  }

  next();
}