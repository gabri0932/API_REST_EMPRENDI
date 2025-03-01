import { AuthModel } from "../models/auth.model";


export class authService{
    static async getSession({sessionId}){
        const result = getSession({sessionId})
        if(!result.success) return {
            sucess: false,
            error: {
                status: 400
            }
        }
        const UserId = result.data;
        const findResult = await AuthModel.getSession(UserId)
        if(!findResult.success) return{
            success: false,
            error:{
                status: findResult.error.status !== 400 ? 500:
                findResult.error.status
            }
        }
        const session = findResult.data
        return {
            success: true,
            data: {
                session
            }
        }
    }
    static async createSession(){}
    static async deleteSession({sessionId}){
        const result = AuthModel.deleteSession({sessionId})
        if(!result.success) return{
            sucess: false,
            error: {
                status: 500
            }
        }
        return{
            sucess: true,
            data: null
        }
    }   
}