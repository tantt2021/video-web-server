import { Controller,Post,Query } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(private commentService:CommentService){}

    // 添加评论
    @Post("addComment")
    addComment(@Query() query){
        console.log("用户添加评论",query);
        
        return this.commentService.addComment(query);
    }

    // 查找评论
    @Post("getComment")
    findComments(@Query() query){
        console.log("查找评论,视频id",query);
        
        return this.commentService.findComments(query);
    }

}
