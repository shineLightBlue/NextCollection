import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'
import encry from '../utils/crypto'
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }
  async login(loginAuthDto: LoginAuthDto) {
    console.log(loginAuthDto)
    const { username, password } = loginAuthDto
    console.log(username,password)
    const user = await this.userService.findOne(username)
    console.log(user)
    console.log(user.password)
    console.log(encry(password,user.salt))
    if(user?.password !==encry(password,user.salt)){
      throw new HttpException('密码错误',HttpStatus.UNAUTHORIZED)
    }
    const payload = {username:user.username,sub:user.id}
    console.log(payload)
    return await this.jwtService.signAsync(payload)
  }

}
