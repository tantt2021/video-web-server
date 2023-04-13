import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
    constructor(@InjectRepository(Comment) private readonly comment:Repository<Comment>){}

    addComment(@Query() query){
        let data = new Comment();
        data.content = query.content;
        data.user_id = query.user_id;
        data.parent_id = query.parent_id;
        data.dynamic_id = query.dynamic_id;
        data.type = query.type;
        data.upvotes = 0;
        data.downvotes = 0;
        return this.comment.save(data);
    }

    // 查找评论
    findComments(@Query() query){
        let {dynamic_id} = query;
        return this.comment.find({
            where:{
                dynamic_id
            }
        })
    }
}
