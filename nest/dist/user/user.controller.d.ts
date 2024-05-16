import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DeviceInfoDto } from './dto/device-info.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("src/user/entities/user.entity").User>;
    test(testParams: any): Promise<string>;
    device(deviceInfoDto: DeviceInfoDto): DeviceInfoDto;
}
