import { Router } from 'express';
import {
  shortenUrl,
  getUrl,
  openUrl,
  deleteUrl,
} from '../controllers/urlsController.js';
import tokenMiddleware from '../middlewares/tokenMiddleware.js';
import shortenUrlMiddleware from '../middlewares/shortenUrlMiddleware.js';

const urlRouter = Router();

urlRouter.post(
  '/urls/shorten',
  tokenMiddleware,
  shortenUrlMiddleware,
  shortenUrl
);
urlRouter.get('/urls/:id', getUrl);
urlRouter.get('/urls/open/:shortUrl', openUrl);
urlRouter.delete('/urls/:id', tokenMiddleware, deleteUrl);

export default urlRouter;
