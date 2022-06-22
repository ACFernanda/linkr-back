import messageSchema from "../schemas/messageSchema.js";

export function messageValidator(req, res, next) {
  const body = req.body;
  const validation = messageSchema.validate(body);
  if (validation.error) {
    return res.status(422).send(validation.error.details.map((detail) => detail.message));
  }

  next();
}
