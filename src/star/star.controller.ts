import { Controller,Query,Post } from '@nestjs/common';
import { StarService } from './star.service';
@Controller('star')
export class StarController {
    constructor(private readonly starService:StarService){}

    // 添加收藏记录
    @Post("addStar")
    addStar(@Query() query){
        console.log("用户收藏了一个视频",query);
        return this.starService.addStar(query);
    }

    // 查询某用户的收藏夹
    @Post("findStar")
    findStar(@Query()query){
        console.log("查询某用户的收藏夹:",query);
        return this.starService.findStar(query);
    }

    // 取消收藏
    @Post("cancelStar")
    cancelStar(@Query() query){
        console.log("取消收藏视频:",query);
        return this.starService.cancelStar(query);
        
    }

    // 查询是否已收藏
    @Post("isStar")
    isStar(@Query() query){
        console.log("查询该用户是否已收藏该视频",query);
        return this.starService.isStar(query);
    }
}
