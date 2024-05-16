import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt'
import { Role } from 'src/role/entities/role.entity';
import { CacheModule } from 'src/cache/cache.module';
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [CacheModule,TypeOrmModule.forFeature([User, Role]),
    // JwtModule.register({secret:process.env.JWT_SECRET})
  ],
  exports: [UserService]
})
export class UserModule { }
