import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enmus/api-error-code.enum';
import { convertToTree } from 'src/utils/convertToTree';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  async create(createMenuDto: CreateMenuDto) {
    try {
      await this.menuRepository.save(createMenuDto);
    } catch (error) {
      throw new ApiException(error, ApiErrorCode.DATABASE_ERROR)
    }
  }

  findAll() {
    return `This action returns all menu`;
  }

  async findMenu(user) {
    const userList: User = await this.userRepository.createQueryBuilder('user')
    .leftJoinAndSelect('user.roles','role').leftJoinAndSelect('role.menus','menu').where({
      username: user.username
    }).orderBy('menu.orderNum','ASC').getOne()
    // console.log(userList, 'userList')
    const menus = userList?.roles.reduce((mergedMenus, role) => {
      // console.log(mergedMenus,role)
      role.menus.forEach((menu:Menu)=>{
        mergedMenus[menu.id]=menu
      })
      return mergedMenus
    },
    {})
    // console.log(menus,'menus')
    const uniqueMenus: Menu[] = Object.values(menus);
    // console.log(uniqueMenus,'uniqueMenus')
    return convertToTree(uniqueMenus);
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
