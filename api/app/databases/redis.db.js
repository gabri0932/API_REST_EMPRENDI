import {Redis} from "ioredis";
import {REDIS_URL, REDIS_PW, REDIS_PORT} from '.env'
let client = null
export async function getRedisClient(){
    if(!client){
        try{
            client = new Redis({
                host: REDIS_URL,
                port: REDIS_PORT,
                password: REDIS_PW
            })
        }catch(error){
            if(error instanceof Error){
                console.error('Something went wrog wit the Redis connection: ', error)
            }
        }
        
    }
    return client
}