import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { Menu } from 'src/menu/entities/menu.entity';
@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports:[TypeOrmModule.forFeature([Role,Permission,Menu])]
})
export class RoleModule {}
