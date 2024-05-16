import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createMenuDto: CreateMenuDto): Promise<void>;
    findMenu(req: any): Promise<any[]>;
    update(id: string, updateMenuDto: UpdateMenuDto): string;
    remove(id: string): string;
}
