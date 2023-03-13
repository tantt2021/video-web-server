import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    // this.userService = new UserService();
    @Get()
    getUsers(): any {
        return this.userService.getUsers();
    }
    @Get("add")
    addUser(): any {
        return this.userService.addUser()
    }
}
