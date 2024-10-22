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
                password: 'u2KX3Ob1o2twJGytODGp3G91QEWPGcpr',
                socket: {
                    host: 'redis-15932.c336.samerica-east1-1.gce.redns.redis-cloud.com',
                    port: 15932
                }
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