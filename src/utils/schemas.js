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

const shortenUrlSchema = joi.object({
  url: joi
    .string()
    .pattern(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    )
    .required(),
});

export { signInSchema, signUpSchema, shortenUrlSchema };
