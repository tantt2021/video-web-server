import { Injectable, Query } from '@nestjs/common';
import { Dynamic } from './entities/dynamic.entity';
import { Following } from 'src/following/entities/following.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const mysql = require('mysql2/promise');


@Injectable()
export class DynamicService {
    constructor(
        @InjectRepository(Dynamic)private readonly dynamic:Repository<Dynamic>,
        @InjectRepository(Following)private readonly following:Repository<Following>
    ){}
    
    // 获取动态
    async getDynamic(@Query() query){
        // 获取关注的人的动态，传过来用户id，找到他关注的用户，根据他关注的用户id，找到动态
        let {userId} = query;
        // 返回
        // 关注用户的id,用户名，用户头像，
        let follows = await this.following.find({
            where:{
                userId
            }
        });
        console.log(follows,"关注的用户");
        let FindIds = `'${userId}',`;
        for(let i = 0;i<follows.length;i++){
            FindIds += `'${follows[i].followId}',`;
        }
        // 删除最后的逗号
        FindIds = FindIds.slice(0,FindIds.length - 1);
        console.log(FindIds,"关注的用户id");
        
        // 动态：发布时间，content，imgArr,转发数，评论数，点赞数
        // （评论列表）
        const connection = await mysql.createConnection({
            host: '1.12.240.146',
            user: 'tantt',
            password: '!Tan402010',
            database: 'videoWeb'
        });
        const [rows] = await connection.execute(
            // `SELECT * FROM dynamic d  WHERE user IN (${FindIds});`
            `SELECT d.* ,u.uname,u.avatar
            FROM dynamic d  
            left join user u on d.user =u.id 
            WHERE user
            IN (${FindIds})
            ORDER BY d.createTime DESC;
            `
        )
        return rows;
    }

    // 添加动态
    addDynamic(@Query() query){        
        // 图片
        let newOne = new Dynamic();
        newOne = query;
        newOne.commentCount = 0;
        newOne.likeCount = 0;
        newOne.repostCount = 0;
        newOne.viewCount = 0;
        return this.dynamic.save(newOne);
    }

}
