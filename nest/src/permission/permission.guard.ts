import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ApiErrorCode } from 'src/common/enmus/api-error-code.enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector:Reflector,
    private userService:UserService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    interface CusRequest extends Request {
      user?:any
    }
    const request:CusRequest = context.switchToHttp().getRequest()
    const requirePermissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getClass(),context.getHandler()]
      ) || []
      // console.log(requirePermissions,'requirePermissions')
      if(requirePermissions.length===0) return true
      const [,token]= request.headers.authorization?.split(' ')?? [];
    const permissionNames = await this.userService.findPermissionNames(
      token,
      request.user
    )
    console.log(permissionNames,'permissionNames')
    const isContainedPermission = requirePermissions.every((item=>permissionNames.includes(item)))
    if(!isContainedPermission){
      throw new ApiException('权限不足',ApiErrorCode.Forbidden)
    }
    return true;
  }
}
