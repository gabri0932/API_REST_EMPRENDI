import { Router } from 'express';
import { UserController } from '../controllers/user.controllers.js';

const userRouter = Router();

userRouter.get('/users', UserController.getUsers);
userRouter.get('/users/:userId', UserController.getUser);
userRouter.patch('/users/:userId', UserController.updateUser);
userRouter.delete('/users/:userId', UserController.deleteUser);

export default userRouter;
