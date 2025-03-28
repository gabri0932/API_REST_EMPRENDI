import { Router } from 'express';
import userRoutes from '../modules/users/routes/user.routes.js';
import authRoutes from '../modules/auth/routes/auth.routes.js';
import profilesRoutes from '../modules/profiles/routes/profiles.routes.js';
import mediaRoutes from '../modules/media/routes/media.routes.js';

const apiRoutes = Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/user', userRoutes);
apiRoutes.use('/profiles', profilesRoutes);
apiRoutes.use('/media', mediaRoutes);

export default apiRoutes;
