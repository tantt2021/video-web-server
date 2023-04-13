import { Controller,Post,Query } from '@nestjs/common';
import { FansService } from './fans.service';
@Controller('fans')
export class FansController {
    constructor(private fansService:FansService){}

    // 获取粉丝列表
    @Post("getFans")
    getFans(@Query() query):any{
        console.log("用户请求返回粉丝列表",query);
        return this.fansService.getFans(query);
    }

    // 新增粉丝
    @Post("addFans")
    addFans(@Query() query):any{
        console.log("用户请求新增粉丝",query);
        return this.fansService.addFans(query);
        
    }
}
