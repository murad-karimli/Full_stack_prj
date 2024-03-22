import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().min(4).alphanum().required(),

  email: Joi.string().email().lowercase().required(),
});


export const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

