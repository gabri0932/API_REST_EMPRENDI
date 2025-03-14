import { getMongoDB } from '../../../app/databases/mongo.db.js';
import 'dotenv/config';

const PROFILE_COLLECTION = process.env.PROFILE_COLLECTION

export class ProfilesModel{
    static async getProfile({ publicId }){
        try{
            const client = await getMongoDB();
            const collection = client.collection(PROFILE_COLLECTION);

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

    static async getProfiles() {};

    static async createProfile({ profile }) {
        try {
            const client = await getMongoDB();
            const collection = client.collection(PROFILE_COLLECTION);
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
            const collection = client.collection(PROFILE_COLLECTION);

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

    static async deleteProfile({ _id }){
        try {
            const client = await getMongoDB();
            const collection = client.collection(PROFILE_COLLECTION);

            const deleteResult = await collection.deleteOne({
                _id
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
