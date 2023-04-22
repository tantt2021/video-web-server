import { Controller, Post, Query } from '@nestjs/common';
import { LikeService } from './like.service';
@Controller('like')
export class LikeController {
    constructor(private readonly likeService:LikeService){}

    // 处理点赞情况
    @Post("toggleLike")
    toggleLike(@Query() query){
        console.log("处理用户点赞与取消点赞",query);
        return this.likeService.toggleLike(query);
    }

    // 查询是否已经点赞
    @Post("isLike")
    isLike(@Query() query){
        console.log("查询用户的点赞记录",query);
        return this.likeService.isLike(query);
    }
}
