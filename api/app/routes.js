import { Router } from 'express';
import userRoutes from '../modules/users/routes/user.routes';
import authRoutes from '../modules/auth/routes/auth.routes';

const apiRoutes = Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/user', userRoutes);

export default apiRoutes;
