import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "./entities/user.entity";
// import { FollowingService } from 'src/following/following.service';
interface UserType {
    userName?: string
    email?:string,
    password?: string,
    id:string,

}
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private user: Repository<User>,
    ) { }
    
    // 得到全部用户
    getUsers() {
        console.log("获取全部用户");
        
        return this.user.find();
    }
    // 注册
    async addUser(query: UserType,tag:string) {
        let { userName } = query;
        let res = await this.user.findOne({
            where: {
                uname: userName,
            }
        });
        if(res){
            // 存在该用户
            return {msg:"用户已存在"};
        }else{
            
            // 不存在该用户，可添加到用户表
            if (tag==='password') {
                let {  password } = query;
                console.log("密码注册",password);
                const data = new User();
                data.uname = userName;
                data.pwd = password;
                data.description = "";
                data.sex = '';
                data.likeCount = 0;
                data.views = 0;
                data.email = userName;
                data.avatar = "img";
                data.fansCount = 12;
                console.log(data,"data");
                
                return await this.user.save(data);
            }else if(tag==='code'){
                // 验证码注册
                
            }
        }
    }
    // 验证用户信息(登录)
    async checkUser(query: UserType) {
        let { userName, password } = query;
        console.log(userName, password,"参数");
        
        let res = await this.user.findOne({
            where: {
                email: userName,
                pwd: password,
            }
        });
        console.log("登录res", res);
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
    // 用户修改信息
    async editInformation(query:UserType){
        let {id} = query;
        const user = await this.user.findOne({
            where:{
                id
            }
        });
        if(!user){
            throw new Error(`User with id${id} not found`);
        }
        Object.assign(user,query);
        console.log("修改成功");
        
        return this.user.save(user);
    }
    // 用户请求其他用户信息
    async getUserPublicInfo(query:any){
        let {followId} = query;
        let res = await this.user.findOne({
            select: ["id","uname","description","sex","likeCount","views","avatar","fansCount","email"],
            where: {
                id:followId
            }
        })
        console.log("res",res);
        
        return res;
        
    }
}
