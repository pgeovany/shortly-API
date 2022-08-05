import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import signInMiddleware from '../middlewares/signInMiddleware.js';
import signUpMiddleware from '../middlewares/signUpMiddleware.js';

const authRouter = Router();

authRouter.post('/sign-in', signInMiddleware, signIn);
authRouter.post('/sign-up', signUpMiddleware, signUp);

export default authRouter;
