import { StringToObject } from "../../../shared/utils/stringToObjectId.js";
import { UserModels } from "../models/user.models.js";

export class UserService {
    static async GetUser(_id){
        const result = StringToObject(_id);

        if (!result.sucess) return {
            success: false,
            error:{
                status: 400
            }
        }

        const UserId = result.data;
        const findresult = await UserModels.GetUser(UserId);

        if (!findresult) return {
            success: false,
            error: {
                status: findresult.error.status !== 404 ? 500:
                findresult.error.status
            }
        }

        const user = findresult.data;

        return {
            success: true,
            data: {
                user
            }
        }
    }

    static async GetUsersByName(users) {
        const findresult = await UserModels.GetUsersByName(users)
        if(!findresult.success) return{
            success: false,
            error: {
                status: findresult.error.status !== 500 ? 400:
                findresult.error.status
            }
            
            
        }
        const users = findresult.data
        return {
            success: true,
            data: {
                users
            }
        }
    }
}
