import { Inject, Injectable } from '@nestjs/common';
import { CreateCacheDto } from './dto/create-cache.dto';
import { UpdateCacheDto } from './dto/update-cache.dto';
import { RedisClientType } from 'redis'
@Injectable()
export class CacheService {
  constructor(@Inject('REDIS_CLIENT') private redisClient: RedisClientType) { }
  async get(key) {
    let value = await this.redisClient.get(key);
    try {
      value = JSON.parse(value)
    } catch (error) {

    }
    return value
  }
  async set(key: string, value: any, second?: number) {
    value = JSON.stringify(value)
    return await this.redisClient.set(key, value, { EX: second })
  }
  async del(key: string) {
    return await this.redisClient.del(key)
  }
  async flushall() {
    return await this.redisClient.flushAll()
  }

}
