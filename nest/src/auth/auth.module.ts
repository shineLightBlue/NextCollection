import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import {ConfigModule,ConfigService} from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService,{
    provide:APP_GUARD,
    useClass:AuthGuard
  }],
  imports:[
    ConfigModule,
    UserModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async (configService:ConfigService)=>{
        console.log(configService)
        console.log(process.env.JWT_SECRET)
        console.log(configService.get('JWT_SECRET'),'JWT_SECRET')
        console.log(configService.get('JWT_SECRET'),'JWT_SECRET')
        console.log(configService.get('JWT_SECRET'),'JWT_SECRET')
        return {
          secret:configService.get('JWT_SECRET'),
          global:true,
          signOptions:{
            expiresIn:'2h'
          }
        }
      }
    })
  ]
})
export class AuthModule {}
