import { error } from "console";
import { getMongoDB } from "../../../app/databases/mongo.db.js";
import { ReturnDocument } from "mongodb";

const USERS_COLLECTION = process.env.USERS_COLLECTION // obtengo la variable user collection del .env

export class UserModels {
    static async GetUser({ _id }){
        try{
            const client = await getMongoDB()
            const collection = client.collection(USERS_COLLECTION)
            const result = await collection.findOne({ _id })

            return {
                success: true,
                data: {
                    user: result
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                console.dir('Error in UserModel.GetUser():', error);

                return {
                    success: false,
                    error: {
                        status: 500
                    }
                } 
            }
        }
        
    };

    static async GetUsersByName({ name }){
        try{
            const client = await getMongoDB()
            const collection = client.collection(USERS_COLLECTION)
            const result = await collection.find({ name }).toArray()

            return {
                success: true,
                data: {
                    users: result
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                console.dir('Error in UserModels.GetUsersByName():', error);

                return {
                    success: false,
                    error: {
                        status: 500
                    }
                } 
            }
        }
    };

    static async CreateUser({ name, email, role, password }){
        try {
            const client = await getMongoDB() // obtengo el cliente de forma asincrónica
            const collection = client.collection(USERS_COLLECTION);

            const user = {
                name,
                email,
                role,
                password,
                createAt: Date.now(),
                updatedAt: Date.now()
            }

            const insertResult = await collection.insertOne(user);

            if (!insertResult.acknowledged) return {
                success: false,
                error: {
                    status: 500
                }
            } // devuelve si salio mal

            return {
                success: true,
                data: {
                    _id: insertResult.insertedId,
                    ...user
                } // si salio bien retorna nos datos, y el resultado success
            }
        } catch(error) {
            if (error instanceof Error) {
                console.dir('Error in createUser():', error);
                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
        }
    };

    static async UpdateUser({_id, name, email, password}) {
        try{
            const client = await getMongoDB()
            const collection = client.collection(USERS_COLLECTION)
            const user = {
                name, 
                email,
                password
            }
            const updateResult = await collection.findOneAndUpdate(
                {_id}, //primer valor es el identificador de lo que se quiere cambiar
                {$set: user},
                { 
                    ReturnDocument: 'after'
                }
            )
            if(!updateResult){
                return {
                    error: {
                        status: 'NOT FOUND'
                    },
                    data: null
                }
                
            }
            return {
                error: null,
                data: updateResult
            }
        }catch(error){
            if(error instanceof Error){
                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }

        }
    }

    static async DeleteUser({ _id }) {
        try{
            const client = await getMongoDB();
            const collection = client.collection(USERS_COLLECTION);

            const deleteResult = await collection.deleteOne({
                _id
            });

            if (!deleteResult.acknowledged) return {
                success: false,
                error: {
                    status: 500
                }
            }

            if (!deleteResult.deletedCount) return {
                success: false,
                error: {
                    status: 404
                }
            }
        } catch(error) {
            if(error instanceof Error){
                console.dir("Error in DeleteUser():", error);

                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
        }
    }
}

/*
(async () => {
    const result = await UserModels.GetUser({
        _id: new ObjectId('67b79b5d7c1f0db9a05d65ac')
    });

    console.dir(result, { depth: null });
})(); */
