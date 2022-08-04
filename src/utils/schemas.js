import joi from 'joi';

const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  confirmPassword: joi.ref('password'),
});

export { signUpSchema }; // eslint-disable-line
