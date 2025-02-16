import { MongoClient } from "mongodb";
import 'dotenv/config' // para usar las variables de entorno del .env

const url = process.env.MONGO_URL // accedo a la variable de entorno del archivo .env
const client = new MongoClient(url) // creo un nuevo cliente

export async function getMongoDB(){
    try {
        const database = client.db(process.env.DATABASE);
        return database;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
