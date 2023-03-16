import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "./entities/user.entity";
interface UserType {
    userName?: string
    email?:string,
    password?: string
}
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly user: Repository<User>
    ) { }
    // 得到全部用户
    getUsers() {
        return this.user.find();
    }
    // 注册
    async addUser(query: UserType,tag?:string) {
        let { userName='', password='' } = query;
        if (tag===undefined) {
            // 注册查用户是否存在流程
            let res = await this.user.findOne({
                where: {
                    uname: userName,
                }
            });
            return res;
        }
        const data = new User();
        data.uname = userName;
        data.pwd = password;
        data.description = "";
        data.sex = 'man';
        data.likeCount = 0;
        data.views = 0;
        data.birth = "2001.04.12";
        return this.user.save(data);
    }
    // 验证用户信息
    async checkUser(query: UserType) {
        let { userName, password } = query;
        let res = await this.user.findOne({
            where: {
                uname: userName,
                pwd: password,
            }
        });
        console.log("res", res);
        return res;
    }
    // 验证码登录
    async loginByCode(query: UserType) {
        let { email } = query;
        // 发验证码
    }
    // 用户名（邮箱）找用户
    async findUserByEmail(email: string) {
        return await this.user.findOne({
            where: {
                uname: email
            }
        })
    }
}
