import { compare, hash } from "bcrypt";
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
        const getUserByEmailResult = await UserModels.GetUserByEmail({ email });

        if (!getUserByEmailResult.success) return {
            success: false,
            error: {
                status: getUserByEmailResult.error.status !== 500 ? 400 :
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

    static async UpdateUser({ _id, name, email, password }){
        const id_result = StringToObject(_id);

        if (!id_result.success) return {
            success: false,
            error: {
                status: 400
            }
        }

        const userId = id_result.data
        const User = UserModels.UpdateUser({ _id: userId, name, email, password });;

        if(!User.success) return {
            success: false,
            error:{
                status: User.error.status !== 404 ? 500:
                User.error.status
            }
        }

        return {
            success: true,
            data: User
        }
    }

    static async DeleteUser({ _id }){
        const userId = UserModels.DeleteUser({ _id });

        if (!userId.success) return {
            success: false,
            error: {
                status: 500
            }
        }

        return {
            success: true,
            data: null
        }
    }
    
    static async CreateUser({ name, email, role, password }){
        const encryptedPw = await hash(password, 10);
        const result = await UserModels.CreateUser({ name, email, role, password: encryptedPw });

        if (!result.success) return {
            success: false,
            error: {
                status: 404
            }
        }
        
        return {
            success: true,
            data: result.data._id
        }
    }
}
