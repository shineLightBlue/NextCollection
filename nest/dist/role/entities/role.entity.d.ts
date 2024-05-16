import { Permission } from "src/permission/entities/permission.entity";
import { Menu } from "src/menu/entities/menu.entity";
export declare class Role {
    id: string;
    name: string;
    createTime: Date;
    updateTime: Date;
    permissions: Permission[];
    menus: Menu[];
}
