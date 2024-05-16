import { CacheService } from './cache.service';
import { CreateCacheDto } from './dto/create-cache.dto';
import { UpdateCacheDto } from './dto/update-cache.dto';
export declare class CacheController {
    private readonly cacheService;
    constructor(cacheService: CacheService);
    create(createCacheDto: CreateCacheDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateCacheDto: UpdateCacheDto): any;
    remove(id: string): any;
}
