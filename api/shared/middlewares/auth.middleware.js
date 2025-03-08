import { ControllerError } from '@shared/classes/controllerError.js';
import { validateUserAuth } from '@shared/utils/validateUserAuth.js';
import { UsersService } from '@users/services/users.service.js';


export async function authRestMiddleware(req, res, next) {
    const sessionId = req.headers.authorization?.split(' ')[1];

    if (!sessionId) {
        req.auth = {
            user: null,
            session: null
        };

        return next();
    }

    const validationUserAuthResult = await validateUserAuth({ sessionId });

    if (!validationUserAuthResult.success) {
        req.auth = {
            user: null,
            session: null
        };

        return next(validationUserAuthResult.error);
    }

    const { _id } = validationUserAuthResult.data;

    const userData = await UsersService.getUserById({ id: _id.toString() });

    if (!userData.success) return next(new ControllerError({
        code: 'INTERNAL_SERVER_ERROR'
    }));

    req.auth = {
        user: userData.data,
        session: sessionId
    };

    next();
}