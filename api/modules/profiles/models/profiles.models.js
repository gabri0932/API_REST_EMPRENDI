import 'dotenv/config'
import { getMongoDB } from '../../../app/databases/mongo.db'
const PROFILE_COLLECTION = process.env.PROFILE_COLLECTION

export class ProfileModels{
    static async getProfile({publicId}){
        try{
            const client = await getMongoDB()
            const collection = client.collection(PROFILE_COLLECTION)
            const result = await collection.findOne({publicId})
            if(!result){
                return {
                    success: false,
                    error:{
                        status: 400
                    }
                }
            }
            return{
                success: true,
                data: result
            }

        }catch(error){
            if(error instanceof Error){
                console.dir('Profile not found')
                return{
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
            return{
                success: false,
                error:{
                    status: 500
                }
            }
        }
    }
    static async getProfiles(){}
    static async updateProfile(){}
    static async deleteProfile(){}
}