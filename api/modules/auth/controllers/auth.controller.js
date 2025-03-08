import { UserService } from "../../users/services/user.service";
import { authService } from "../services/auth.service";
import { validateUserInput } from "../validators/auth.validator";

export class AuthController{
    static async verify(req, res){};

    static async signin(req, res){
        const request = req.body;

        const validationResult = validateUserInput(request);

        if (!validation.success) {
            res.status(400).json({
                status: 400,
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
    
    static async signup(req, res){};
    static async signout(req, res){};
}
