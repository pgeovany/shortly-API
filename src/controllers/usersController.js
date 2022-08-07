import STATUS from '../utils/statusCodes.js';
import userRepository from '../repositories/userRepository.js';
import urlsRepository from '../repositories/urlsRepository.js';

async function getUser(req, res) {
  const { userId } = res.locals;

  try {
    const user = await userRepository.getUserVisitCount(userId);
    const userUrls = await urlsRepository.getUrlsByUserId(userId);

    res.status(STATUS.OK).send({ ...user, shortenedUrls: userUrls });
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function rankUsers(req, res) {
  try {
    res.sendStatus(STATUS.OK);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export { getUser, rankUsers };
