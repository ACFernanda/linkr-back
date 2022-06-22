import joi from "joi";

export const newPostSchema = joi.object({
  url: joi.string().uri().required(),
  description: joi.string().allow(""),
});

export const editPostSchema=joi.object({
  description: joi.string().allow("")
});
