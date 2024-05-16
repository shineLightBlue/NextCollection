import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from "typeorm";
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { CacheService } from 'src/cache/cache.service';
export declare class UserService {
    private cacheService;
    private userRespository;
    private roleRepository;
    constructor(cacheService: CacheService, userRespository: Repository<User>, roleRepository: Repository<Role>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(username: string): Promise<User>;
    findPermissionNames(token: string, userInfo: any): Promise<string[]>;
    test(testParams: any): Promise<string>;
}
