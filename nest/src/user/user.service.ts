import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { In, Repository } from "typeorm"
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { User } from './entities/user.entity';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enmus/api-error-code.enum';
import { Role } from 'src/role/entities/role.entity';
import { CacheService } from 'src/cache/cache.service';
@Injectable()
export class UserService {
  constructor(
    private cacheService:CacheService,
    @InjectRepository(User)
    private userRespository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const { username, password, roleIds } = createUserDto;
    const existUser = await this.userRespository.findOne({
      where: { username }
    })
    if (existUser) {
      throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST)
    }
    try {
      const roles = await this.roleRepository.find({
        where: {
          id: In(roleIds)
        }
      })
      console.log(roles, 'roles')
      const newUser = await this.userRespository.create({
        username,
        password,
        roles
      });
      console.log(newUser)
      return await this.userRespository.save(newUser)
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    // return await this.userRespository.save(createUserDto);
  }
  async findOne(username: string) {
    const user = await this.userRespository.findOne({
      where: { username }
    })
    if (!user) throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST)
    return user;
  }
  // test(testParams) {
  //   console.log(testParams, 'testParams')
  //   return testParams;
  // }
  async findPermissionNames(token: string, userInfo) {
    const user = await this.userRespository.findOne({
      where: { username: userInfo.username },
      // where: { username: 'admin' },
      relations: ['roles', 'roles.permissions']
    })
    console.log(user,'user')
    if (user) {
      console.log(user.roles.map(role => role.permissions), 'map')
      console.log(user.roles.flatMap(role => role.permissions), 'flatMap')
      const permissions = user.roles.flatMap((role) => role.permissions)
      const permissionNames = permissions.map((item) => item.name)
      console.log(...new Set(permissionNames))
      return [...new Set(permissionNames)]
    } else {
      return []
    }
  }
  async test(testParams){
    return await this.cacheService.set('name','dfxy')
  }
  // async findAll() {
  //   throw new ApiException('用户不存在',ApiErrorCode.USER_NOTEXIST)
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
