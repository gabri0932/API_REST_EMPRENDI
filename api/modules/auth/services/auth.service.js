import { AuthModel } from "../models/auth.model.js";
import { singNewJet } from "../../../shared/utils/jwtMethods.js";

export class authService{
    static async getSession({ sessionId }){
        const findResult = await AuthModel.getSession({ sessionId });

        if(!findResult.success) return{
            success: false,
            error:{
                status: findResult.error.status
            }
        }

        const session = findResult.data;

        return {
            success: true,
            data: session
        }
    }

    static async createSession({ userId }){
        const sessionId = crypto.randomUUID();
        const token = singNewJet({ _id: userId });

        const createSessionResult = await AuthModel.createSession({ sessionId, token });

        if (!createSessionResult.success) return{
            success: false,
            error: 'Its imposible create the session'
        }
        
        return {
            success: true,
            data: sessionId
        }
    }

    static async deleteSession({ sessionId }) {
        const result = await AuthModel.deleteSession({ sessionId });

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
