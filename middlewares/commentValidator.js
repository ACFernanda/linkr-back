import commentSchema from "../schemas/commentSchema.js";

export function commentValidator(req, res, next) {
  const body = req.body;
  const validation = commentSchema.validate(body);
  if (validation.error) {
    return res.status(422).send(validation.error.details.map((detail) => detail.message));
  }

  next();
}
