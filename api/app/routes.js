import { Router } from 'express';
import userRoutes from '../modules/users/routes/user.routes.js';
import authRoutes from '../modules/auth/routes/auth.routes.js';

const apiRoutes = Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/user', userRoutes);

export default apiRoutes;
