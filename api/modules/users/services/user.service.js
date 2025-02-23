import { compare } from "bcrypt";
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

    static async GetUserByCredentials({ email, password }) {
        const getUserbyEmailResult = await UserModels.GetUserByEmail(email);

        if (!getUserbyEmailResult.success) return {
            success: false,
            error: {
                status: getUserbyEmailResult.error.status !== 500 ? 404 :
                getUserbyEmailResult.error.status
            }
        }

        const { user: userbyEmail } = getUserbyEmailResult.data // extraigo los valores que se encontro de getuser...

        const isSameUser = await compare(password, userbyEmail.password);

        if (!isSameUser) return {
            success: false,
            error: {
                status: 400
            }
        }

        return {
            sucess: true,
            data: {
                user: isSameUser
            }
        }
    };
}
