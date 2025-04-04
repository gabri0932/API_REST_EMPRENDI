import { ProfilesService } from '../services/profiles.service.js';
import { parseQueryParams } from '../../../shared/utils/parseQueryParams.js';
import { technologiesArray as skills } from '../consts/technologies.js';
import { servicesArray as services } from '../consts/services.js';
import {
    validateRole,
    validateImageUpdate,
    validateCustomerProfile,
    validateFreelancerProfile,
    validateCustomerProfileUpdate,
    validateFreelancerProfileUpdate
} from '../validators/profiles.validator.js';
import { filterProfiles } from '../utils/filterProfiles.js';

export class ProfilesController{
    static async getProfiles(req, res) {
        if (!req.auth.user) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized, you need being authenticated to process the request.'
            });

            return;
        }

        const { page, limit, ...filters } = parseQueryParams(req.query);

        const skip = (page - 1) * limit;

        const getProfilesResult = await ProfilesService.getProfiles({
            skip,
            limit,
            filters
        });

        if (!getProfilesResult.success) {
            res.status(500).json({
                status: 500,
                message: 'Internal Server Error.'
            });

            return;
        }

        const { profiles, count: profilesCount } = getProfilesResult.data;
        const filteredProfiles = filterProfiles(profiles);

        res.status(200).json({
            status: 200,
            message: 'Profiles found successfully.',
            page,
            limit,
            profilesCount,
            data: {
                profiles: filteredProfiles
            }
        });
    }

    static async getProfileByPublicId(req, res){
        if (!req.auth.user) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized, you need being authenticated to process the request.'
            });

            return;
        }

        const { id } = req.params;
        
        const result = await ProfilesService.getProfileByPublicId({ publicId: id });

        if (!result.success) {
            const status = result.error.status;

            res.status(status).json((
                status === 404
                    ? { status: 404, message: `Not Found. Requested profile wasn't found.` }
                    : { status: 500, message: 'Internal Server Error.' }
            ));

            return;
        }

        const profile = filterProfiles(result.data.profile);

        res.status(200).json({
            status: 200,
            message: 'Profile found.',
            data: {
                profile
            }
        });
    }

    static async getProfileByUser(req, res) {
        if (!req.auth.user) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized, you need being authenticated to process the request.'
            });

            return;
        }

        const { _id } = req.auth.user;

        const getProfileResult = await ProfilesService.getProfileByUser({
            userId: _id
        });

        if (!getProfileResult.success) {
            const status = getProfileResult.error.status;

            res.status(status).json((
                status === 404
                    ? { status: 404, message: 'User does not have an active profile.' }
                    : { status: 500, message: 'Internal Server Error.' }
            ));

            return;
        }

        const { profile } = getProfileResult.data;

        res.status(200).json({
            status: 200,
            message: 'User profile found.',
            data: {
                profile
            }
        });
    }

    static getProfilesSkills(_, res) {
        res.status(200).json({
            status: 200,
            message: 'Profiles skills retrieved successfully.',
            data: {
                skills
            }
        });
    }

    static getProfilesServices(_, res){
        res.status(200).json({
            status: 200,
            message: 'Profiles services retrieved successfully.',
            data: {
                services
            }
        });
    }

    static async createProfile(req, res){
        if (!req.auth.user) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized, you need being authenticated to process the request.'
            });

            return;
        }

        const userId = req.auth.user._id;
        const reqBody = req.body;
        const roleValidation = validateRole(reqBody);

        if (!roleValidation.success) {
            res.status(400).json({
                status: 400,
                message: 'Bad Request, check your body request.',
                error: JSON.parse(roleValidation.error.message)
            });

            return;
        }

        const { role } = roleValidation.data;

        const accordValidationResult = role === 'customer'
            ? validateCustomerProfile(reqBody)
            : validateFreelancerProfile(reqBody);

        if (!accordValidationResult.success) {
            res.status(400).json({
                status: 400,
                message: 'Bad Request, check your body request.',
                error: JSON.parse(accordValidationResult.error.message)
            });

            return;
        }

        const newProfile = accordValidationResult.data;

        const creationResult = await ProfilesService.createProfile({
            userId,
            newProfile
        });

        if (!creationResult.success) {
            res.status(creationResult.error.status).json({
                status: creationResult.error.status,
                message: creationResult.error.message
            });

            return;
        }

        const { profile } = creationResult.data;

        res.status(201).json({
            status: 201,
            message: 'Profile created successfully.',
            data: {
                profile
            }
        });
    }

    static async hireProfile(req, res) {
        if (!req.auth.user) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized, you need being authenticated to process the request.'
            });

            return;
        }

        const userId = req.auth.user._id;
        const { id } = req.params;

        const hireResult = await ProfilesService.hireProfile({
            userId,
            profileIdToHire: id
        });

        if (!hireResult.success) {
            res.status(hireResult.error.status).json({
                status: hireResult.error.status,
                message: hireResult.error.message
            });

            return result;
        }

        const hiredProfileData = hireResult.data;

        res.status(200).json({
            status: 200,
            message: 'Profile hired successfully.',
            data: hiredProfileData
        });
    }

    static async updateProfile(req, res) {
        if (!req.auth.user) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized, you need being authenticated to process the request.'
            });

            return;
        }
        
        const userId = req.auth.user._id;
        const getUserProfileResult = await ProfilesService.getProfileByUser({
            userId
        });

        if (!getUserProfileResult.success) {
            res.status(getUserProfileResult.error.status).json(
                getUserProfileResult.error.status === 404
                    ? { status: 404, message: 'The user does not have an active profile.' }
                    : { status: 500, message: 'Internal Server Error.' }
            );

            return;
        }

        const toUpdate = req.body;

        const validationResult = getUserProfileResult.data.profile.role === 'freelancer'
            ? validateFreelancerProfileUpdate(toUpdate)
            : validateCustomerProfileUpdate(toUpdate);

        if (!validationResult.success) {
            res.status(400).json({
                status: 400,
                message: 'Bad Request. Check your body request.',
                error: JSON.parse(validationResult.error.message)
            });

            return;
        }

        const { _id: profileId, ...profileFound } = getUserProfileResult.data
        
        const profile = {
            ...profileFound,
            ...validationResult.data
        }

        const updateResult = await ProfilesService.updateProfile({
            profileId,
            profile
        });

        if (!updateResult.success) {
            res.status(500).json({
                status: 500,
                message: 'Internal Server Error.'
            });

            return;
        }

        const updatedProfile = updateResult.data.profile;

        res.status(200).json({
            status: 200,
            message: 'Profile updated successfully.',
            data: {
                profile: updatedProfile
            }
        });
    }

    static async updateProfileImages(req, res) {
        if (!req.auth.user) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized, you need being authenticated to process the request.'
            });

            return;
        }

        const userId = req.auth.user._id;
        const getUserProfile = await ProfilesService.getProfileByUser({
            userId
        });

        if (!getUserProfile.success) {
            res.status(getUserProfile.error.status).json({
                status: getUserProfile.error.status,
                message: getUserProfile.error.message
            });

            return;
        }

        const profileId = getUserProfile.data.profile._id;

        const validationResult = validateImageUpdate(req.body);

        if (!validationResult.success) {
            res.status(400).json({
                status: 400,
                message: 'Bad Request, check your body request.',
                error: JSON.parse(validationResult.error.message)
            });

            return;
        }

        const { data: images } = validationResult;

        const updateResult = await ProfilesService.updateProfileImages({
            profileId,
            images
        });

        if (!updateResult.success) {
            res.status(updateResult.error.status).json({
                status: updateResult.error.status,
                message: updateResult.error.message
            });

            return;
        }

        const updatedProfile = updateResult.data.profile;

        res.status(200).json({
            status: 200,
            message: 'Profile image(s) updated successfully.',
            data: {
                profile: updatedProfile
            }
        });
    }

    static async deleteProfile(req, res) {
        if (!req.auth.user) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized, you need being authenticated to process the request.'
            });

            return;
        }

        const userId = req.auth.user._id;

        const getUserProfileResult = await ProfilesService.deleteProfile({
            userId
        });

        if (!getUserProfileResult.success) {
            res.status(getUserProfileResult.error.status).json({
                ...getUserProfileResult.error
            });

            return;
        }

        res.status(200).json({
            status: 200,
            message: 'Profile deleted successfully.'
        });
    }
}
