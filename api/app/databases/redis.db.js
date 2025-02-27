import { Redis } from "ioredis";
import 'dotenv/config';

const REDIS_URL = process.env.REDIS_URL;
const REDIS_PW = process.env.REDIS_PW;
const REDIS_PORT = process.env.REDIS_PORT;

let client = null;

export async function getRedisClient(){
    if (!client) {
        try{
            client = new Redis({
                host: REDIS_URL,
                port: REDIS_PORT,
                password: REDIS_PW
            })

            client.on('error', (err) => {
                console.error('Redis connection error:', err);
                throw err;
            });

            await client.ping();
        } catch(error) {
            if (error instanceof Error) {
                console.error('Something went wrong wit the Redis connection: ', error);
                throw error;
            }
        }
    }

    return client
}
