import { UserService } from '../../users/services/user.service.js';
import { ProfilesModel } from '../models/profiles.models.js';
import { createProfile } from '../utils/createProfile.js';
import { filterProfiles } from '../utils/filterProfiles.js';

export class ProfilesService {
    static async getProfileByPublicId({ publicId }) {
        const result = await ProfilesModel.getProfile({ publicId });

        if (!result.success) return {
            success: false,
            error: result.error.status === 404
                ? { status: 404, message: 'Profile not found.' }
                : { status: 500, message: 'Internal Server Error.' }
        }

        const profile = result.data;

        return {
            success: true,
            data: {
                profile
            }
        }
    }

    static async getProfileByUser({ userId }) {
        const getProfileResult = await ProfilesModel.getProfileByOwner({
            owner: userId
        });

        if (!getProfileResult.success) return {
            success: false,
            error: getProfileResult.error
        }

        const profile = getProfileResult.data;

        return {
            success: true,
            data: {
                profile
            }
        }
    }

    static async getProfiles({ skip, limit, filters }) {
        const result = await ProfilesModel.getProfiles({ skip, limit, filters });

        if (!result.success) return {
            success: false,
            error: {
                status: 500,
                message: 'Internal Server Error.'
            }
        }

        const { profiles, count } = result.data;

        return {
            success: true,
            data: {
                profiles,
                count
            }
        }
    }

    static async createProfile({ userId, newProfile }) {
        const hasProfile = await ProfilesModel.getProfileByOwner({
            owner: userId
        });

        if (hasProfile.success) return {
            success: false,
            error: {
                status: 400,
                message: 'Profile already exists.'
            }
        }

        const getUserResult = await UserService.GetUser({
            _id: userId.toString()
        });

        if (!getUserResult.success) return {
            success: false,
            error: {
                status: 500,
                message: 'Internal Server Error.'
            }
        }

        const profile = {
            name: getUserResult.data.name,
            email: getUserResult.data.email,
            ...createProfile(newProfile, userId)
        };

        const createProfileResult = await ProfilesModel.createProfile({ profile });

        if (!createProfileResult.success) return {
            success: false,
            error: {
                status: 500,
                message: 'Internal Server Error.'
            }
        }

        const filteredProfile = filterProfiles(
            {
                _id: createProfileResult.data,
                ...profile
            }
        );

        return {
            success: true,
            data: {
                profile: filteredProfile
            }
        }
    }

    static async hireProfile({ userId, profileIdToHire }) {
        const getUserProfileResult = await this.getProfileByUser({
            userId
        });

        if (!getUserProfileResult.success) {
            const error = getUserProfileResult.error;
            const { status } = getUserProfileResult.error;

            return status === 404
                ? { success: false, error: { status: 400, message: 'The current user does not have a profile.' } }
                : { success: false, error };
        }

        const userProfile = getUserProfileResult.data.profile;

        if (userProfile.role !== 'customer') return {
            success: false,
            error: {
                status: 403,
                message: 'The user does not have permission to perform this action.'
            }
        }

        const getProfileToHireResult = await this.getProfileByPublicId({
            userId: profileIdToHire
        });

        if (!getProfileToHireResult.success) return {
            success: false,
            error: {
                status: getProfileToHireResult.error.status,
                message: getProfileToHireResult.error.status === 404
                    ? 'The profile you wish to hire does not exist.'
                    : getProfileToHireResult.error.message
            }
        }

        const profileToHire = getProfileToHireResult.data.profile;

        if (userProfile.hired_profiles.includes(profileIdToHire)) return {
            success: true,
            data: {
                email: profileToHire.email,
                phone: profileToHire.phone
            }
        }

        const updateAppliedToProfile = {
            ...userProfile,
            hired_profiles: [
                ...userProfile.hired_profiles,
                profileIdToHire
            ]
        }

        const { _id: profileId, profile } = updateAppliedToProfile;

        const updateResult = await ProfilesModel.updateProfile({
            profileId,
            profile
        });

        if (!updateResult.success) return {
            success: false,
            error: {
                status: 500,
                message: 'Internal Server Error.'
            }
        }

        return {
            success: true,
            data: {
                email: profileToHire.email,
                phone: profileToHire.phone
            }
        }
    }

    static async updateProfile({ profileId, profile }) {
        const updateProfileResult = await ProfilesModel.updateProfile({
            profileId,
            profile
        });

        if (!updateProfileResult.success) return {
            success: false,
            error: updateProfileResult.error
        }

        const updatedProfile = updateProfileResult.data;

        return {
            success: true,
            data: {
                profile: updatedProfile
            }
        }
    }

    static async deleteProfile({ userId }) {
        const getProfileResult = await ProfilesModel.getProfileByOwner({
            owner: userId
        });

        if (!getProfileResult.success) return {
            success: false,
            error: getProfileResult.error.status === 404
                ? { status: 400, message: 'Bad Request. User does not have an active profile.' }
                : { status: 500, message: 'Internal Server Error.' }
        }

        const { _id: profileId } = getProfileResult.data;

        const deleteResult = await ProfilesModel.deleteProfile({ profileId });

        if (!deleteResult.success) return {
            success: false,
            error: {
                status: 500,
                message: 'Internal Server Error.'
            }
        }

        return {
            success: true,
            data: 'OK'
        }
    }
}
