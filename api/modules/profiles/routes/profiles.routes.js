import { Router } from "express";
import { ProfilesController } from '../controllers/profiles.controller.js'; 

const profilesRouter = Router();

profilesRouter.get('/', ProfilesController.getProfiles);
profilesRouter.get('/me', ProfilesController.getProfileByUser);
profilesRouter.get('/skills', ProfilesController.getProfilesSkills);
profilesRouter.get('/services', ProfilesController.getProfilesServices);
profilesRouter.get('/:id', ProfilesController.getProfileByPublicId);
profilesRouter.post('/', ProfilesController.createProfile);
profilesRouter.post('/hire/:id', ProfilesController.hireProfile);
profilesRouter.patch('/', ProfilesController.updateProfile);
profilesRouter.patch('/images', ProfilesController.updateProfileImages);
profilesRouter.delete('/', ProfilesController.deleteProfile);

export default profilesRouter;
