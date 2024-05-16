import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import encry from '../../utils/crypto'
import * as crypto from 'crypto';
import { Role } from "src/role/entities/role.entity";
@Entity("user")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @Column({ length: 30 })
    username: string;
    @Column({ nullable: true })
    nickname: string;
    @Column()
    password: string;
    @Column({ nullable: true })
    avatar: string; //头像
    @Column({ nullable: true })
    email: string; //邮箱
    @Column({ nullable: true })
    role: string; //角色
    @ManyToMany(()=>Role)
    @JoinTable({
        name:'user_role_relation'
    })
    roles:Role[];
    @Column({ nullable: true })
    salt: string;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_time: Date;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_time: Date;
    @BeforeInsert()
    beforeInsert(){
        this.salt = crypto.randomBytes(4).toString('base64')
        this.password = encry(this.password,this.salt)
    }
}
