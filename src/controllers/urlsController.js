import { nanoid } from 'nanoid/async';
import STATUS from '../utils/statusCodes.js';
import urlsRepository from '../repositories/urlsRepository.js';

async function shortenUrl(req, res) {
  const { userId, url } = res.locals;

  try {
    const shortUrl = await nanoid(8);
    await urlsRepository.saveUrl(userId, url, shortUrl);

    res.send({ shortUrl }).status(STATUS.CREATED);
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function getUrl(req, res) {
  const { id } = req.params;

  try {
    const url = await urlsRepository.getUrlById(id);
    if (!url) {
      res.sendStatus(STATUS.NOT_FOUND);
      return;
    }

    delete url.user_id;

    res.send(url).status(STATUS.OK);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function openUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const url = await urlsRepository.getUrlByShortUrl(shortUrl);
    if (!url) {
      res.sendStatus(STATUS.NOT_FOUND);
      return;
    }

    await urlsRepository.updateVisitCount(url.id);

    res.redirect(url.url);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function deleteUrl(req, res) {
  const { userId } = res.locals;
  const { id } = req.params;

  try {
    const url = await urlsRepository.getUrlById(id);

    if (!url) {
      res.sendStatus(STATUS.NOT_FOUND);
      return;
    }

    if (url.user_id !== userId) {
      res.sendStatus(STATUS.UNAUTHORIZED);
      return;
    }

    await urlsRepository.deleteUrl(id);

    res.sendStatus(STATUS.NO_CONTENT);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export { shortenUrl, getUrl, openUrl, deleteUrl };
