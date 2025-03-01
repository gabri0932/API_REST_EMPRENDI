import { AuthModel } from "../models/auth.model";
import { StringToObject } from '../../../shared/utils/stringToObjectId';

export class authService{
    static async getSession({ sessionId }){
        const conversionResult = StringToObject(sessionId);

        if (!conversionResult.success) return {
            success: false,
            error: {
                status: 400,
                message: 'Invalid session id provided.'
            }
        }

        const findResult = await AuthModel.getSession({ sessionId: conversionResult.data });

        if(!findResult.success) return{
            success: false,
            error:{
                status: findResult.error.status !== 400 ? 500:
                findResult.error.status
            }
        }

        const session = findResult.data;

        return {
            success: true,
            data: session
        }
    }

    static async createSession(){}

    static async deleteSession({ sessionId }) {
        const conversionResult = StringToObject(sessionId);

        if (!conversionResult.success) return {
            success: false,
            error: {
                status: 400,
                message: 'Invalid session id provided.'
            }
        }

        const result = AuthModel.deleteSession({ sessionId: conversionResult.data });

        if (!result.success) return {
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
