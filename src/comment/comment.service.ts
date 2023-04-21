import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
const mysql = require('mysql2/promise');

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private readonly comment:Repository<Comment>
    ){}

    addComment(@Query() query){
        let data = new Comment();
        data.content = query.content;
        data.user_id = query.user_id;
        data.parent_id = query.parent_id;
        data.dynamic_id = query.dynamic_id;
        data.type = query.type;
        data.reply_user_id = query.reply_user_id;
        data.upvotes = 0;
        data.downvotes = 0;

        // 给被评论的用户添加评论提醒消息messge

        return this.comment.save(data);
    }

    // 查找评论
    async findComments(@Query() query){
        let {dynamic_id} = query;
        const connection = await mysql.createConnection({
            host: '1.12.240.146',
            user: 'tantt',
            password: '!Tan402010',
            database: 'videoWeb'
        });
        const [rows] = await connection.execute(
            
            `SELECT c.*,u.uname,u.avatar
            from comment c 
            left join user u on c.user_id = u.id 
            where c.dynamic_id = '${dynamic_id}';`

        )
        return rows;

    }
}
