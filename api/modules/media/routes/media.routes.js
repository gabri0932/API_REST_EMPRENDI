import { Router } from 'express';
import { MediaController } from '../controllers/media.controller.js';
import upload from '../utils/upload.js';
import { fileSizeMiddleware } from '../middlewares/fileSize.middleware.js';

const mediaRouter = Router();

mediaRouter.get('/images/avatars/:name', MediaController.getAvatarImageByName);
mediaRouter.get('/images/covers/:name', MediaController.getCoverImageByName);
mediaRouter.post('/images/avatar', upload, fileSizeMiddleware, MediaController.saveAvatarImage);
mediaRouter.post('/images/cover', upload, fileSizeMiddleware, MediaController.saveCoverImage);
mediaRouter.delete('/images/avatar', MediaController.deleteAvatarImage);
mediaRouter.delete('/images/cover', MediaController.deleteCoverImage);

export default mediaRouter;
