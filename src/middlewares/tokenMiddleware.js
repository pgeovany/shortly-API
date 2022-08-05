import jwt from 'jsonwebtoken';
import STATUS from '../utils/statusCodes.js';

async function tokenMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    res.sendStatus(STATUS.UNAUTHORIZED);
    return;
  }

  let id;

  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    id = decoded.id;
  } catch (error) {
    res.sendStatus(STATUS.UNAUTHORIZED);
  }

  res.locals = { userId: id };

  next();
}

export default tokenMiddleware;
