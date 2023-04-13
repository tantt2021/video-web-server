import { Controller,Post,Query } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(private commentService:CommentService){}

    // 添加评论
    @Post("addComment")
    addComment(@Query() query){
        return this.commentService.addComment(query);
    }

    // 查找评论
    @Post("findComments")
    findComments(@Query() query){
        return this.commentService.findComments(query);
    }

}
