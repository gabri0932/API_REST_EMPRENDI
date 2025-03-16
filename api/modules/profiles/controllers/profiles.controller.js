import { ProfilesService } from '../services/profiles.service.js';
import { parseQueryParams } from '../../../shared/utils/parseQueryParams.js';
import { technologiesArray as skills } from '../consts/technologies.js';
import { servicesArray as services } from '../consts/services.js';

export class ProfilesController{
    static async getProfiles(req, res) {
        if (!req.auth.user) {
            res.status(400).json({
                status: 400,
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

        res.status(200).json({
            status: 200,
            message: 'Profiles found successfully.',
            page,
            limit,
            profilesCount,
            data: {
                profiles
            }
        });
    }

    static async getProfileByPublicId(req, res){
        if (!req.auth.user) {
            res.status(400).json({
                status: 400,
                message: 'Unauthorized, you need being authenticated to process the request.'
            });

            return;
        }
        const {_id} = req.auth.user
        const result = await ProfilesModel.getProfileByUser({userId: _id})
        if(!result.success){
            const status = result.error.status === 404 ? 400 : 500
           res.status(status).json({
            status,
            error: status === 400
                ? { status: 400, message: 'Bad Request. User does not have an active profile.' }
                : { status: 500, message: 'Internal Server Error.' }

           }) 

            res.status(status).json({
                status,
                error: status === 400 ? {
                    status: 400, message: 'Bad request. User does not have an active profile'
                }
                : {
                    status: 500, message: 'Internal Server Error'
                }
            })
        }
        res.status(200).json({ status: 200, message: 'User profile found.', data: { profile: result.data.profile } })

    }

    static async getProfilesServices(_, res){
        res.status(200).json({
            status: 200,
            message: 'Profiles services retrieved successfully.',
            data: {
                services
            }
        });
    }

    static async createProfile(){}
    static async hireProfile(){}
    static async updateProfile(){}
    static async deleteProfile(){}
}
