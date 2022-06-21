import joi from "joi";

const messageSchema = joi.object({
  text: joi.string().required()
});

export default messageSchema;
