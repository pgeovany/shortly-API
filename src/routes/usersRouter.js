import { Router } from 'express';
import { getUser, rankUsers } from '../controllers/usersController.js';
import tokenMiddleware from '../middlewares/tokenMiddleware.js';

const usersRouter = Router();

usersRouter.get('/users/me', tokenMiddleware, getUser);
usersRouter.get('ranking', rankUsers);

export default usersRouter;
