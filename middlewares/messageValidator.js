import messageSchema from "../schemas/messageSchema.js";

export function messageValidator(req, res, next) {
  const {text} = req.body;
  const validation = messageSchema.validate(text);
  if (validation.error) {
    return res.status(422).send(validation.error.details.map((detail) => detail.message));
  }

  next();
}
