import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import signUpMiddleware from '../middlewares/signUpMiddleware.js';

const authRouter = Router();

authRouter.post('/sign-in', signIn);
authRouter.post('/sign-up', signUpMiddleware, signUp);

export default authRouter;
