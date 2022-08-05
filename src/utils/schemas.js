import joi from 'joi';

const signInSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  confirmPassword: joi.ref('password'),
});

export { signInSchema, signUpSchema };
