import STATUS from '../utils/statusCodes.js';
import { shortenUrlSchema } from '../utils/schemas.js';

async function shortenUrlMiddleware(req, res, next) {
  const { url } = req.body;

  try {
    await shortenUrlSchema.validateAsync({ url });
  } catch (error) {
    res
      .status(STATUS.UNPROCESSABLE_ENTITY)
      .send(error.details.map((e) => e.message).join(', '));
    return;
  }

  res.locals = {
    ...res.locals,
    url,
  };

  next();
}

export default shortenUrlMiddleware;
