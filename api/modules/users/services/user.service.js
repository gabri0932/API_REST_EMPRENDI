import { compare } from "bcrypt";
import { StringToObject } from "../../../shared/utils/stringToObjectId.js";
import { UserModels } from "../models/user.models.js";

export class UserService {
    static async GetUser({ _id }){
        const result = StringToObject(_id);

        if (!result.success) return {
            success: false,
            error:{
                status: 400
            }
        }

        const UserId = result.data;
        const findResult = await UserModels.GetUser(UserId);

        if (!findResult) return {
            success: false,
            error: {
                status: findResult.error.status !== 404 ? 500:
                findResult.error.status
            }
        }

        const user = findResult.data;

        return {
            success: true,
            data: {
                user
            }
        }
    }

    static async GetUsersByName({ name }) {
        const findResult = await UserModels.GetUsersByName(name);

        if (!findResult.success) return {
            success: false,
            error: {
                status: findResult.error.status
            }
        }

        const { users } = findResult.data;

        return {
            success: true,
            data: {
                users
            }
        }
    }

    static async GetUserByCredentials({ email, password }) {
        const getUserByEmailResult = await UserModels.GetUserByEmail(email);

        if (!getUserByEmailResult.success) return {
            success: false,
            error: {
                status: getUserByEmailResult.error.status !== 500 ? 404 :
                getUserByEmailResult.error.status
            }
        }

        const { user: userByEmail } = getUserByEmailResult.data // extraigo los valores que se encontro de getuser...

        const isSameUser = await compare(password, userByEmail.password);

        if (!isSameUser) return {
            success: false,
            error: {
                status: 400
            }
        }

        return {
            success: true,
            data: {
                user: isSameUser
            }
        }
    };
}
