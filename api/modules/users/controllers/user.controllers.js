import { UserService } from "../services/user.service.js";

export class UserController{
     // métodos son las cosas que puedes hacer en ese plano
    static async UpdateUser(req, res){
        const { userId } = req.params;

        const userDataToUpdate = req.body
        const DataUpdate = await UserService.UpdateUser({ _id: userId, ...userDataToUpdate });

        if (!DataUpdate.success) {
            res.status(DataUpdate.error.status).json({
                status: DataUpdate.error.status, 
                message: DataUpdate.error.status === 500? 'Internal Server Error': 'Something went wrong'
            })
        }
        
        res.status(200).json({
            status:200,
            message: 'User updated successfully.'
        })
    }

    static async deleteUser (req, res) {
        const { userId } = req.params;
        const dataDelete = await UserService.DeleteUser({ _id: userId });

        if (!dataDelete.success) {
            res.status(dataDelete.error.status).json({
                status: dataDelete.error.status,
                message: dataDelete.error.status === 500? 'Internal server Error' : 'Something went wrong'
            })
        }

        res.status(200).json({
            status: 200,
            message: 'User deleted successfully.'
        })
    }
} // las clases son como planos en los cuales puedes hacer diferentes cosas
