import { createClient, type RedisClientType } from 'redis';

export class RedisClient {
    private static instance: RedisClientType;
    private static isConnecting: boolean = false;
    private static connectPromise: Promise<void> | null = null;


    private constructor() { }

    public static async getInstance(): Promise<RedisClientType> {
        if (RedisClient.instance) {
            return RedisClient.instance;
        }

        if (!RedisClient.isConnecting) {
            RedisClient.isConnecting = true;

            RedisClient.instance = createClient({
                url: process.env.KV_URL,
            });

            RedisClient.instance.on('error', (err) => console.error('Redis Client Error', err));

            RedisClient.connectPromise = RedisClient.instance.connect()
                .then(() => {
                    RedisClient.isConnecting = false;
                })
                .catch((err) => {
                    RedisClient.isConnecting = false;
                    console.error('Erro ao conectar ao Redis:', err);
                    throw err;
                });
        }


        if (RedisClient.connectPromise) {
            await RedisClient.connectPromise;
        }

        return RedisClient.instance
    }
}

export default RedisClient;