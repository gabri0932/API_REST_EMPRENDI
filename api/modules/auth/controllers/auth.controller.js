import { UserService } from "../../users/services/user.service";
import { authService } from "../services/auth.service";
import { validateUserInput } from "../validators/auth.validator";

export class AuthController{
    static async verify(req, res){};
    static async signin(req, res){
        const request = req.body
        const validationResult = validateUserInput(request)
        if(!validation.success){
            res.status(400).json({status: 400, error: JSON.parse(validationResult.error.messange)})
        }
        const userToCreate = validationResult.data
        const service = await UserService.GetUserByCredentials(userToCreate)
        if(!service.success){
            res.status(400).json({status:400, error:JSON.parse(service.error.messange)})
        }
        res.status(201).json({status:200, message: 'logged in sucessfully'})
       
    };
    static async signup(req, res){};
    static async signout(req, res){};
}
