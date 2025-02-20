import { getMongoDB } from "../../../app/databases/mongo.db.js";

const USERS_COLLECTION = process.env.USERS_COLLECTION // obtengo la variable user collection del .env

export class UserModels {
    static async GetUser(){}

    static async GetUsers(){}

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
    }

    static async UpdateUser(){}

    static async DeleteUser(){}
}

(async () => {
    const result = await UserModels.CreateUser({
        name: 'Gabriel',
        email: 'gabriel@gmail.com',
        role: 'freelancer',
        password: 'gabriel200'
    });

    console.dir(result, { depth: null });
})();
