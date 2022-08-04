import { signUpSchema } from '../utils/schemas.js';
import STATUS from '../utils/statusCodes.js';

async function signUpMiddleware(req, res, next) {
  const user = req.body;

  try {
    await signUpSchema.validateAsync(user, { abortEarly: false });
  } catch (error) {
    res
      .status(STATUS.UNPROCESSABLE_ENTITY)
      .send(error.details.map((e) => e.message).join(', '));
    return;
  }

  req.locals = user;

  next();
}

export default signUpMiddleware;
