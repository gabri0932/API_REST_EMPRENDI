import { MongoClient } from "mongodb";
import 'dotenv/config' //para usar las variables de entorno del .env
import { error } from "console";
const url = process.env.MONGO_URL //accedo a la variable de entorno del archivo .env
console.log(url)
const client = new MongoClient(url) //creo un nuevo cliente
async function run(){
    try{
        const databases = process.env.DATABASE
        return databases
    }catch(error){
        console.log(error)
    }
}
export default run