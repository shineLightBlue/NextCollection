import { RedisClientType } from 'redis';
export declare class CacheService {
    private redisClient;
    constructor(redisClient: RedisClientType);
    get(key: any): Promise<string>;
    set(key: string, value: any, second?: number): Promise<string>;
    del(key: string): Promise<number>;
    flushall(): Promise<string>;
}
