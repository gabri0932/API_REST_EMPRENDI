import { Router } from "express";

const ProfileRoutes = Router()

ProfileRoutes.get('/profile')
ProfileRoutes.get('/profiles')
ProfileRoutes.delete('/delet-profile')
ProfileRoutes.put('/updated-profile')

export default ProfileRoutes;