import { Controller, Get, Query, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    // 获取所有用户
    @Get()
    getUsers(): any {
        return this.userService.getUsers();
    }
    // 注册
    @Post("add")
    addUser(@Query() query): any {
        console.log("接收到的数据query", query);
        if (Object.keys(query).length>0) {
            // 正常注册
            console.log("正常注册");
            
            return this.userService.addUser(query);
        } else {
            // 验证码登录
            // 验证是否存在该用户，存在则返回正常，不存在就存用户进数据库
            console.log("验证码登录");

            if (this.userService.findUserByEmail(query.userName)) {
                return { msg: '数据库存在该用户' };
            } else {
                return this.userService.addUser(query,'code');
            }
        }
    }
    // 登录
    @Post("check")
    checkUser(@Query() query): any {
        console.log("有用户尝试登录,参数:", query);
        return this.userService.checkUser(query);
    }
    // 验证码登录
    @Post("throughCode")
    loginByCode(@Query() query): any{
        console.log("用户尝试验证码登录:",query);
        return this.userService.loginByCode(query);
    }
}

