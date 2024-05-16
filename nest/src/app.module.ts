import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { MenuModule } from './menu/menu.module';
import { CacheModule } from './cache/cache.module';
console.log(resolve('.env'))
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'mysql',
    autoLoadEntities: true,
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "db05",
    synchronize: true
  }),
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    MenuModule,
    CacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
