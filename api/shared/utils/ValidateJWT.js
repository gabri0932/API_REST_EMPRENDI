import { verifyJwt } from './jwtMethods.js';
import { StringToObject } from './stringToObjectId.js';

export function validateJWT({ token }) {
    const tokenCheck = verifyJwt(token);

    if (!tokenCheck.success) return {
        success: false,
        error: {
            status: 400,
            message: 'Expired session. Please sign in again'
        }
    }

    const conversionResult = StringToObject(tokenCheck.payload._id);

    if (!conversionResult.success) return {
        success: false,
        error: {
            status: 500,
            message: 'Internal Server Error.'
        }
    }

    const jwtPayload = {
        _id: conversionResult.data
    };

    return {
        success: true,
        data: jwtPayload
    }
}
