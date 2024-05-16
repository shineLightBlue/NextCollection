import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { Request } from 'express'
import { Reflector } from '@nestjs/core';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector:Reflector
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic',[
      context.getHandler(),
      context.getClass()
    ])
    if(isPublic){
      return true
    }
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) throw new HttpException('验证不通过', HttpStatus.FORBIDDEN)
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret:  this.configService.get('JWT_SECRET'),
      })
      console.log(payload,'payload')
      request['user'] = payload
      console.log(request,'request')
    } catch {
      throw new HttpException('token验证失败', HttpStatus.FORBIDDEN)
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    console.log(request.headers.authorization?.split(' '))
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
