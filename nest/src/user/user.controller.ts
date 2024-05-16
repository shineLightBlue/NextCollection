import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Permissions, Public } from 'src/public/public.decorator';
import { DeviceInfoDto } from './dto/device-info.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   console.log(createUserDto)
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto){
    return this.userService.create(createUserDto)
  }
  @Post('test')
  @Permissions('create','read')
  test(@Body() testParams){
    return this.userService.test(testParams)
  }
  @Post('device')
  @Public()
  device(@Body() deviceInfoDto:DeviceInfoDto){
    console.log(deviceInfoDto)
    return deviceInfoDto
  }
}
