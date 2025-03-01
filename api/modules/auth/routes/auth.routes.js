import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/verify-session', authController.verify );
authRouter.post('/signin', authController.signin );
authRouter.post('/signup', authController.signup );
authRouter.post('/signout', authController.signout );

export default authRouter;
