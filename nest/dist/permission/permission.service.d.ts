import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
export declare class PermissionService {
    private permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
    create(createPermissionDto: CreatePermissionDto): Promise<CreatePermissionDto & Permission>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePermissionDto: UpdatePermissionDto): string;
    remove(id: number): string;
}
