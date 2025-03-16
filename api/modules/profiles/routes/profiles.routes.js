import { Router } from "express";
import { ProfilesController } from '../controllers/profiles.controller.js';

const profilesRouter = Router();

profilesRouter.get('/', ProfilesController.getProfiles);
profilesRouter.get('/:id', ProfilesController.getProfileByPublicId);
profilesRouter.get('/me', ProfilesController.getProfileByUser);
profilesRouter.get('/skills', ProfilesController.getProfilesSkills);
profilesRouter.get('/services', ProfilesController.getProfilesServices);
profilesRouter.post('/', );
profilesRouter.post('/hire/:id', );
profilesRouter.patch('/', );
profilesRouter.delete('/', );

export default profilesRouter;
