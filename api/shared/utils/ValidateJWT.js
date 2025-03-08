export function validateJWT({ token }) {
    const tokenCheck = verifyJwt(token);

    if (!tokenCheck.success) {
        const error = new ControllerError({
            code: 'UNAUTHORIZED',
            errorMessage: 'Expired session. Please sign in again'
        });

        return {
            success: false,
            error
        }
    }

    const conversionResult = stringToObjectID(tokenCheck.payload._id);

    if (!conversionResult.success) {
        const error = new ControllerError({
            code: 'INTERNAL_SERVER_ERROR'
        });

        return {
            success: false,
            error
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