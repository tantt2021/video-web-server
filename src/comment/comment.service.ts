import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Video } from 'src/video/entities/video.entity';
import { Dynamic } from 'src/dynamic/entities/dynamic.entity';
const mysql = require('mysql2/promise');

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private readonly comment:Repository<Comment>,
        @InjectRepository(Video) private readonly video:Repository<Video>,
        @InjectRepository(Dynamic) private readonly dynamic:Repository<Dynamic>
    ){}

    async addComment(@Query() query){
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

        // 更新评论数
        if(data.type === 'dynamic'){
            const dynamic = await this.dynamic.findOne({where:{id:query.dynamic_id}});
            dynamic.commentCount += 1;
            this.dynamic.save(dynamic);
        }else{

        }

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
            where c.dynamic_id = '${dynamic_id}'
            order by c.createTime ASC;`

        )
        return rows;

    }
}
