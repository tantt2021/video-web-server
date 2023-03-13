import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly user: Repository<User>
    ) { }
    getUsers() {
        return this.user.find();
    }
    addUser() {
        const data = new User();
        data.id = 2;
        data.uname = 'tantt';
        data.pwd = '1';
        data.decription = "do you want to build a snowman";
        data.sex = 'man';
        data.likeCount = 12;
        data.views = 232;
        data.birth = "2001.04.12";
        return this.user.save(data);
    }
}
