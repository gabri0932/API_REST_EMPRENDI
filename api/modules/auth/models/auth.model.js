import { getRedisClient } from "../../../app/databases/redis.db.js";

export class AuthModel{
    static async getSession({ sessionId }){
        try {
            const client = await getRedisClient();
            const session = await client.get(sessionId);

            if (!session) return {
                success: false,
                error: {
                    status: 404
                }
            }

            return {
                success: true,
                data: session
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error in function getSession:', error);

                return {
                    success: false,
                    error:{
                        status: 500
                    }
                }
            }
        }
    }

    static async createSession({ sessionId, token }){
        try {
            const client = await getRedisClient();
            const session = await client.set(sessionId, token);

            if (session !== 'OK') {
                return{
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
            
            return {
                success: true,
                data: null
            }
        } catch (error) {
            if(error instanceof Error){
                console.log('Error in function createSession:', error);

                return {
                    success: false,
                    error:{
                        status: 500
                    }
                }
            }
        }
    }

    static async deleteSession({ sessionId }){
        try {
            const client = await getRedisClient();
            const deleteUserResult = await client.del(sessionId);

            if (!deleteUserResult) return {
                success: false,
                error: {
                    status: 500
                }
            }

            return {
                success: true,
                data: null
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error in function deleteSession:', error);

                return {
                    success: false,
                    error:{
                        status: 500
                    }
                }
            }
        }
    }
}
