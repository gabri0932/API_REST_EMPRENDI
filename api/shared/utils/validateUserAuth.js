import { authService } from '../../modules/auth/services/auth.service.js';
import { verifySession } from './verifySession.js';
import { validateJWT } from './ValidateJWT.js';

export async function validateUserAuth({ sessionId }) {
    const sessionValidationResult = await verifySession({ sessionId });

    if (!sessionValidationResult.success) return {
        success: false,
        error: sessionValidationResult.error
    }

    const token = sessionValidationResult.data;

    const tokenCheck = validateJWT({ token });

    if (!tokenCheck.success) {
        authService.deleteSession({ sessionId });

        return {
            success: false,
            error: tokenCheck.error
        }
    }

    return {
        success: true,
        data: tokenCheck.data
    }
}
