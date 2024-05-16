import { Role } from "src/role/entities/role.entity";
export declare class User {
    id: number;
    username: string;
    nickname: string;
    password: string;
    avatar: string;
    email: string;
    role: string;
    roles: Role[];
    salt: string;
    create_time: Date;
    update_time: Date;
    beforeInsert(): void;
}
