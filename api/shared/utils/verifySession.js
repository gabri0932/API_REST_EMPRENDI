import { authService } from '../../modules/auth/services/auth.service.js';

export async function verifySession({ sessionId }) {
    const getResult = await authService.getSession({ sessionId });
    
    if (!getResult.success) {
        return {
            success: false,
            error: {
                status: 400,
                message: "Couldn't find the provided session id"
            }
        }
    }

    const token = getResult.data;

    return {
        success: true,
        data: token
    }
}
