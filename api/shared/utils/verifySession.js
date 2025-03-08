import { authService } from '../../modules/auth/services/auth.service.js';
import { verifyJwt } from './jwtMethods.js';
import { StringToObject } from './stringToObjectId.js';
export async function verifySession({ sessionId }) {
    const getResult = await AuthService.getSessionById(sessionId);
    
    if (!getResult.success) {
        const error = new ControllerError({
            code: 'UNAUTHORIZED',
            errorMessage: "Couldn't find the provided session id"
        });

        return {
            success: false,
            error
        }
    }

    const token = getResult.data;

    return {
        success: true,
        data: token
    }
}