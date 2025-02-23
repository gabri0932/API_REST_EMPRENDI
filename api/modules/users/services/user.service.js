import { StringToObject } from "../../../shared/utils/stringToObjectId.js";
import { UserModels } from "../models/user.models.js";

export class UserService {
    static async GetUser({ _id }){
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

    static async GetUsersByName({ name }) {
        const findresult = await UserModels.GetUsersByName(name);

        if (!findresult.success) return {
            success: false,
            error: {
                status: findresult.error.status
            }
        }

        const { users } = findresult.data;

        return {
            success: true,
            data: {
                users
            }
        }
    }

    static async GetUserByEmail({ email }) {
        const findresult = await UserModels.GetUserByEmail({ email });

        if (!findresult.success) return {
            success: false,
            error: {
                status: findresult.error.status
            }
        }

        const { user } = findresult.data;

        return{
            success: true,
            data:{
                user
            }
        }
    }

    static async GetUserByCredentials({ email, password }) {};
}
