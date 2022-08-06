import bcrypt from 'bcrypt';
import STATUS from '../utils/statusCodes.js';
import userRepository from '../repositories/userRepository.js';
import generateToken from '../utils/token/generateToken.js';

async function signIn(req, res) {
  const { email, password } = req.locals;

  try {
    const user = await userRepository.getUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.sendStatus(STATUS.UNAUTHORIZED);
      return;
    }

    const token = generateToken(user.id);

    res.send({ token }).status(STATUS.OK);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function signUp(req, res) {
  const user = req.locals;

  try {
    const userExists = await userRepository.getUserByEmail(user.email);
    if (userExists) {
      res.sendStatus(STATUS.CONFLICT);
      return;
    }

    await userRepository.createUserAccount(user);

    res.sendStatus(STATUS.CREATED);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export { signIn, signUp };
