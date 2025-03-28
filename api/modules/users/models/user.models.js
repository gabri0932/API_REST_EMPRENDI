import { getMongoDB } from "../../../app/databases/mongo.db.js";

const USERS_COLLECTION = process.env.USERS_COLLECTION // obtengo la variable user collection del .env

export class UserModels {
    static async GetUser({ _id }){
        try{
            const client = await getMongoDB()
            const collection = client.collection(USERS_COLLECTION)
            const result = await collection.findOne({ _id })

            return {
                success: true,
                data: result
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
        
        return {
            success: false,
            error: {
                status: 500
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

        return {
            success: false,
            error: {
                status: 500
            }
        }
    };

    static async GetUserByEmail({ email }){
        try{
            const client = await getMongoDB();
            const collection = client.collection(USERS_COLLECTION);
            const result = await collection.findOne({ email });

            if(!result){
                return{
                    success:false,
                    error: {
                        status: 404
                    }
                }
            }

            return {
                success: true,
                data: result
            }
        } catch(error) {
            if(error instanceof Error) return {
                success: false,
                error:{
                    status: 500
                }
            }
        }

        return {
            success: false,
            error: {
                status: 500
            }
        }
    }
    
    /*  
    static async GetUsersByCredentials({ email, password }){
        try{
            const client = await getMongoDB();
            const collection = client.collection(USERS_COLLECTION);

            const result = await collection.findOne({ email, password });

            if(!result){
                return {
                    success: false,
                    error: {
                        status: 400
                    }
                }
            }

            return {
                success: true,
                data: {
                    user: result
                }
            }
        } catch(error) {
            if(error instanceof Error){
                return {
                    success: false,
                    error: {
                        status:500
                    }
                }
            }
        }

        return {
            success: false,
            error: {
                status: 500
            }
        }
    } */

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
                    _id: insertResult.insertedId
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

        return {
            success: false,
            error: {
                status: 500
            }
        }
    };

    static async UpdateUser({ _id, name, email, password }) {
        try {
            const client = await getMongoDB();
            const collection = client.collection(USERS_COLLECTION);

            const user = {
                name, 
                email,
                password
            }

            const updateResult = await collection.findOneAndUpdate(
                { _id }, // primer valor es el identificador de lo que se quiere cambiar
                { $set: user },
                { 
                    returnDocument: 'after'
                }
            );

            if (!updateResult) return {
                success: false,
                error: {
                    status: 'NOT FOUND'
                },
            }

            return {
                success: true,
                data: {
                    user: updateResult
                }
            }
        } catch(error) {
            if (error instanceof Error) {
                console.dir('Error in UserModels.DeleteUser():', error);
                
                return {
                    success: false,
                    error: {
                        status: 500
                    }
                }
            }
        }

        return {
            success: false,
            error: {
                status: 500
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

            return {
                success: true,
                data: 'OK'
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

        return {
            success: false,
            error: {
                status: 500
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
/*
(async () => {
    const result = await UserModels.DeleteUser({
        _id: new ObjectId('67b7a8805c03361ca8b55d1f')
    });

    console.dir(result, { depth: null });
})(); */
