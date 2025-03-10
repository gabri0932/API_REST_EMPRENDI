import { UserService } from "../../users/services/user.service.js";
import { authService } from "../services/auth.service.js";
import { validateUserInput } from "../validators/auth.validator.js";
import { validateUserCreation } from "../validators/auth.validator.js";

export class AuthController{
    static async verify(req, res){
        if (!req.auth.user) {
            res.status(400).json({
                status: 400,
                message: 'Unauthorized, sign in.'
            });

            return;
        }

        const { password: _, ...authUser } = req.auth.user;

        res.status(200).json({
            status: 200,
            message: 'Valid session.',
            data: {
                user: authUser
            }
        });
    };

    static async signin(req, res){
        const request = req.body;

        const validationResult = validateUserInput(request);

        if (!validationResult.success) {
            res.status(400).json({
                status: 400,
                message: 'Bad request, check the request body.',
                error: JSON.parse(validationResult.error.message)
            });

            return;
        }

        const userCredentials = validationResult.data;
        
        const findResult = await UserService.GetUserByCredentials(userCredentials);

        if (!findResult.success) {
            res.status(401).json({
                status:401,
                error: `User with provided credentials wasn't found.`
            });

            return;
        }

        const createSessionResult = await authService.createSession({
            userId: findResult.data._id
        });

        if (!createSessionResult.success) {
            res.status(500).json({
                status: 500,
                message: 'Internal Server Error.'
            });

            return;
        }

        res.status(200).json({
            status: 200,
            message: 'Logged in successfully.',
            data: {
                sessionId: createSessionResult.data
            }
        });
    };
    
    static async signup(req, res){
        const request = req.body;
        const validateResult = validateUserCreation(request);

        if (!validateResult.success) {
            res.status(400).json({
                status: 400,
                message: 'Bad request, check the request body.',
                error: JSON.parse(validateResult.error.message)
            });

            return;
        }

        const createResult = await UserService.CreateUser(validateResult.data);

        if (!createResult.success) {
            res.status(500).json({
                status: 500,
                message: 'Something went wrong.'
            });

            return;
        }
        
        res.status(201).json({
            status: 201,
            message: 'Signed up successfully.',
            data: {
                userId: createResult.data
            }
        })
    };
    
    static async signout(req, res){
        if (!req.auth.session) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized, please sign in.'
            });

            return;
        }
        
        const session = {
            sessionId: req.auth.session
        }
        
        const deletionResult = await authService.deleteSession(session);

        if (!deletionResult.success) {
            res.status(500).json({
                status: 500,
                message: 'Internal Server Error.'
            });

            return;
        }

        res.status(200).json({
            status: 200,
            message: 'Session deleted successfully.'
        });
    };
}
