import { Router } from 'express';
import { UserController } from '../controllers/user.controllers.js';

const userRouter = Router();

userRouter.patch('/users/:userId', UserController.UpdateUser);
userRouter.delete('/users/:userId', UserController.deleteUser);

export default userRouter;
