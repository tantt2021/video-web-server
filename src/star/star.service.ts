import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Star } from './entities/star.entity';
import { Video } from 'src/video/entities/video.entity';
import { Message } from 'src/message/entities/message.entity';
const mysql = require('mysql2/promise');

interface StarType{
    userId:string,
    videoId:string,
    id:string,
}

@Injectable()
export class StarService {
    constructor(
        @InjectRepository(Star) 
        private star:Repository<Star>,
        @InjectRepository(Video)
        private video:Repository<Video>,
        @InjectRepository(Message)
        private message:Repository<Message>
    ){}

    // 添加收藏记录
    async addStar(query:StarType){
        let data = new Star();
        data.userId = query.userId;
        data.videoId = query.videoId;
        // 视频收藏量+1
        await this.star.save(data);
        const video = await this.video.findOne({where:{id:query.videoId}});
        video.starCount += 1;
        await this.video.save(video);

        // 添加收藏消息
        let newStarMess = new Message();
        // 查询视频作者
        let {authorId} = await this.video.findOne({
            where:{
                id:query.videoId
            }
        })
        newStarMess.is_read = false;
        newStarMess.message_text = "收藏";
        newStarMess.operate = "收藏";
        newStarMess.type = "other";
        newStarMess.receiver_id = authorId;
        newStarMess.sender_id = query.userId;
        newStarMess.target_id = query.videoId;
        this.message.save(newStarMess);
        return {msg:"已添加到收藏夹并更新了视频收藏量&添加收藏消息"};
    }

    // 查询收藏夹
    async findStar(query:StarType){
        let {userId} = query;
        const connection = await mysql.createConnection({
            host: '1.12.240.146',
            user: 'tantt',
            password: '!Tan402010',
            database: 'videoWeb'
        });
          
        const [rows] = await connection.execute(
            `SELECT v.authorId,v.author,v.title,v.cover,v.duration ,v.views ,v.id,v.starCount ,v.createTime ,s.starAt,v.marqueeCount  
            from video v
            right join star s on v.id  = s.videoId 
            where s.userId  = '${userId}';`
        );
          
        return rows;
    }

    // 取消收藏
    async cancelStar(query:StarType){
        let {userId,videoId} = query;
        await this.star.delete({
                userId,
                videoId
        });
        const video = await this.video.findOne({where:{id:videoId}});
        video.starCount -= 1;
        await this.video.save(video);
        // 删除收藏信息
        let message = await this.message.findOne({
            where:{
                type:'other',
                sender_id:userId,
                receiver_id:video.authorId,
                message_text:"收藏",
                operate:"收藏",
                target_id:videoId,
            }
        })
        this.message.remove(message);
        return {msg:"已取消收藏并更新了视频收藏量"};
    }

    // 查询是否已收藏
    async isStar(query:StarType){
        let {userId,videoId} = query;
        let res = await this.star.find({
            where:{
                userId,
                videoId
            }
        })
        console.log(res.length,res,"是否已收藏");
        
        if(res.length===0){
            return "该用户没收藏此视频";
        }else{
            return "该用户已收藏此视频"
        }
    }
}
