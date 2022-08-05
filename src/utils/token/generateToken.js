import jwt from 'jsonwebtoken';

function generateToken(id) {
  const expiration = 60 * 60 * 2;
  const secret = process.env.JWT_SECRET;

  const token = jwt.sign({ id }, secret, { expiresIn: expiration });

  return token;
}

export default generateToken;
