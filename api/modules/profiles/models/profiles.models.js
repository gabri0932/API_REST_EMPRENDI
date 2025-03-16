import { getMongoDB } from '../../../app/databases/mongo.db.js';
import { applyFilters } from '../utils/applyFilters.js';
import 'dotenv/config';

const PROFILES_COLLECTION = process.env.PROFILES_COLLECTION;

export class ProfilesModel {
    static async getProfile({ publicId }){
        try{
            const client = await getMongoDB();
            const collection = client.collection(PROFILES_COLLECTION);

            const result = await collection.findOne({ publicId });

            if (!result) return {
                success: false,
                error:{
                    status: 404
                }
            }

            return {
                success: true,
                data: result
            }
        } catch(error) {
            if (error instanceof Error) {
                console.log('Error in ProfileModels.getProfile:\n');
                console.dir(error);
                
                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
        }

        return {
            success: false,
            error:{
                status: 500
            }
        }
    }

    static async getProfiles({ skip, limit, filters }) {
        try {
            const client = await getMongoDB();
            const collection = client.collection(PROFILES_COLLECTION);

            const appliedFilters = applyFilters(filters);
            console.log('appliedFilters:', appliedFilters);
            const normalizedFilters = appliedFilters.length && appliedFilters.length > 1
                ? { $and: appliedFilters }
                : appliedFilters[0] || {};

            const getProfilesResult = await collection.find(
                normalizedFilters
            ).skip(skip).limit(limit).toArray();
            const profilesCount = await collection.countDocuments(normalizedFilters);

            return {
                success: true,
                data: {
                    profiles: getProfilesResult,
                    count: profilesCount
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error in ProfilesModel.getProfiles():\n');
                console.dir(error);

                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
        }

        return {
            success: false,
            error: {
                status: 500
            }
        }
    };

    static async getProfileByOwner({ owner }) {
        try {
            const client = await getMongoDB();
            const collection = client.collection(PROFILES_COLLECTION);

            const result = await collection.findOne({ owner });

            if (!result) return {
                success: false,
                error: {
                    status: 404
                }
            }

            return {
                success: true,
                data: result
            }
        } catch(error) {
            if (error instanceof Error) {
                console.log('Error in ProfilesModel.getProfileByOwner:\n');
                console.dir(error);

                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
        }

        return {
            success: false,
            error: {
                status: 500
            }
        }
    }

    static async createProfile({ profile }) {
        try {
            const client = await getMongoDB();
            const collection = client.collection(PROFILES_COLLECTION);
            const result = await collection.insertOne({ profile });

            if (!result.acknowledged) return {
                success: false,
                error: {
                    status: 500
                }
            }

            return {
                success: true,
                data: result.insertedId
            }
        } catch(error) {
            if (error instanceof Error) {
                console.log('Error in ProfilesModel.createProfile:\n');
                console.dir(error);

                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
        }

        return {
            success: false,
            error: {
                status: 500
            }
        }
    };

    static async updateProfile({ profileId, profile }) {
        try{
            const client = await getMongoDB();
            const collection = client.collection(PROFILES_COLLECTION);

            const updateResult = await collection.findOneAndUpdate(
                { profileId },
                { $set: profile },
                {
                    returnDocument: 'after'
                }
            )

            if (!updateResult) {
                return{
                    success: false,
                    error: {
                        status: 404
                    }
                }
            }

            return {
                success: true,
                data: {
                    user: updateResult
                }
            }
        } catch(error) {
            if (error instanceof Error) {
                console.log('Error in ProfilesModel.updateProfile():\n');
                console.dir(error);

                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
        }

        return {
            success: false,
            error: {
                status: 500
            }
        }
    };

    static async deleteProfile({ profileId }){
        try {
            const client = await getMongoDB();
            const collection = client.collection(PROFILES_COLLECTION);

            const deleteResult = await collection.deleteOne({
                _id: profileId
            })

            if (!deleteResult.acknowledged) {
                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }

            if (!deleteResult.deleteCount) {
                return {
                    success: false,
                    error: {
                        status: 404
                    }
                }
            }

            return {
                success: true,
                data: 'OK'
            }
        } catch(error) {  
            if (error instanceof Error) {
                console.log('Error in ProfilesModel.deleteProfile():\n');
                console.dir(error);

                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
        }

        return {
            success: false,
            error: {
                status: 500
            }
        }
    }
}
