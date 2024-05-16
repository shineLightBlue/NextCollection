import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from './auth.guard';
import { Public } from 'src/public/public.decorator';
import { ApiOperation, ApiTags,ApiOkResponse,ApiBearerAuth } from '@nestjs/swagger/dist';
import { LoginResponse } from './vo/auth.vo';
@ApiTags('登录验证模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Public()
  @Post('login')
  @ApiOperation({
    summary:'登录接口'
  })
  @ApiOkResponse({description:'登录成功返回', type:LoginResponse})
  login(@Body() loginAuthDto: LoginAuthDto) {
    console.log(LoginAuthDto)
    return this.authService.login(loginAuthDto)
  }
  @ApiBearerAuth()
  @Post('test')
  test() {
    return 1
  }
  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
