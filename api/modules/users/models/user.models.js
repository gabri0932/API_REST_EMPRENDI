import { getMongoDB } from "../../../app/databases/mongo.db.js";
const User_Collection = process.env.USERS_COLLECTION //obtengo la variable user collection del .env
console.log(User_Collection)
export class UserModels {
    static async GetUser(){}
    static async GetUsers(){}
    static async CreateUser({name, email, password}){
        try{
            const client = await getMongoDB() //obtengo el cliente de forma asincronica
            const collection = client.collection(User_Collection)
            const user = {
                name,
                email,
                password,
                createAt: Date.now(),
                updatedAt: Date.now()
            }
            const result = collection.insertOne(user)
            if(!result.acknowledged) return {success: false, error: {status:500}} //devuelve si salio mal
            return {
                success: true,
                data: {
                    _id: insertResult.insertId,
                    ...user
                } //si salio bien retorna nos datos, y el resultado sucess
            }
        }catch(error){
            if(error instanceof Error){
                Console.dir('Error in createUser():', error)
            }
            
        }
    } 
    static async UpdateUser(){}
    static async DeleteUser(){}
}