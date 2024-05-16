import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class MenuService {
    private menuRepository;
    private userRepository;
    constructor(menuRepository: Repository<Menu>, userRepository: Repository<User>);
    create(createMenuDto: CreateMenuDto): Promise<void>;
    findAll(): string;
    findMenu(user: any): Promise<any[]>;
    update(id: number, updateMenuDto: UpdateMenuDto): string;
    remove(id: number): string;
}
