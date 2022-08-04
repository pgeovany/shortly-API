import STATUS from '../utils/statusCodes.js';
import getUserByEmail from '../utils/users/getUserByEmail.js';
import createUserAccount from '../utils/users/createUserAccount.js';

async function signIn(req, res) {
  res.sendStatus(STATUS.OK);
}

async function signUp(req, res) {
  const user = req.locals;

  try {
    const userExists = await getUserByEmail(user.email);
    if (userExists) {
      res.sendStatus(STATUS.CONFLICT);
      return;
    }

    await createUserAccount(user);

    res.sendStatus(STATUS.CREATED);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export { signIn, signUp };
