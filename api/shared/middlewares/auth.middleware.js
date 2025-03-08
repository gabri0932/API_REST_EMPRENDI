import { validateUserAuth } from '@shared/utils/validateUserAuth.js';
import { UserService } from '../../modules/users/services/user.service';

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
        res.status(validationUserAuthResult.error.status || 500).json({
            ...validationUserAuthResult.error
        });

        return;
    }

    const { _id } = validationUserAuthResult.data;

    const userData = await UserService.GetUser({ _id: _id.toString() });

    if (!userData.success) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error.'
        });

        return;
    };

    req.auth = {
        user: userData.data,
        session: sessionId
    };

    next();
}
