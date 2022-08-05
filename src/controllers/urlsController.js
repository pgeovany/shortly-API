import { nanoid } from 'nanoid/async';
import STATUS from '../utils/statusCodes.js';
import saveUrl from '../utils/urls/saveUrl.js';

async function shortenUrl(req, res) {
  const { userId, url } = res.locals;
  try {
    const shortUrl = await nanoid(8);
    await saveUrl(userId, url, shortUrl);

    res.send({ shortUrl }).status(STATUS.CREATED);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function getUrl(req, res) {
  res.sendStatus(STATUS.OK);
}

async function openUrl(req, res) {
  res.sendStatus(STATUS.OK);
}

async function deleteUrl(req, res) {
  res.sendStatus(STATUS.OK);
}

export { shortenUrl, getUrl, openUrl, deleteUrl };
