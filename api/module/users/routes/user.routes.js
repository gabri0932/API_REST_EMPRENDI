import {Router} from 'express'

const userRouter = Router()

userRouter.get('/users/:userId')
userRouter.patch('/users/:userId')
userRouter.delete('/users/:userId')

export default userRouter;