import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/verify-session', AuthController.verify);
authRouter.post('/signin', AuthController.signin);
authRouter.post('/signup', AuthController.signup);
authRouter.post('/signout', AuthController.signout);

export default authRouter;
