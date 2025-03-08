import { UserService } from "../../users/services/user.service.js";
import { authService } from "../services/auth.service.js";
import { validateUserInput } from "../validators/auth.validator.js";
import { validateUserCreation } from "../validators/auth.validator.js";

export class AuthController{
    static async verify(req, res){
       
    };

    static async signin(req, res){
        const request = req.body;

        const validationResult = validateUserInput(request);

        if (!validation.success) {
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

        res.status(200).json({
            status:200,
            message: 'Logged in successfully.'
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
    
    static async signout(req, res){};
}
