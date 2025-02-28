import { getRedisClient } from "../../../app/databases/redis.db";

export class AuthModel{
    static async getSession(sessionId){
        try{
            const client = await getRedisClient()
            const session = await client.get(sessionId)
            if(!session){
                return{
                    sucess: falsa,
                    error: {
                        status: 404
                    }
                } 
            }
            return{
                success: true,
                data: {
                    session: session
                }
            }
        }catch(error){
            if(error instanceof Error){
                console.dir('Error in function getSession', error)
                return{
                    success: false,
                    error:{
                        status: 500
                    }
                }
            }
        }
    }
    static async createSesion(sessionId, token){
        const client = await getRedisClient()
        const session = await client.set(sessionId, token)
        if(session !== 'OK'){
            return{
                success: false,
                error:{
                    status:500
                }
            }
        }return{
            sucess: true,
            data: null
        } 
    }
    static async deleteSession(sessionId){
        const client = await getRedisClient()
        const deleteUserResult = client.del(sessionId)
        if(!deleteUserResult) return {
            success: false,
            error: {
                status: 500
            }
        }
        return {
            success: true,
            data: null
        }
    }
}