import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { Video } from 'src/video/entities/video.entity';

interface LikeType{
    userId:string,
    videoId:string,
    id:string,
}

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like)
        private like:Repository<Like>,
        @InjectRepository(Video)
        private video:Repository<Video>
    ){}
    
    // 处理点赞和取消赞
    async toggleLike(@Query() query:LikeType){
        let {userId,videoId} = query;
        const likeRecord = await this.like.findOne({
            where:{userId,videoId}
        });
        if(likeRecord){
            // 已经点过赞
            await this.like.remove(likeRecord);
            await this.video.decrement({id:videoId},'likeCount',1);
            return {msg:"已取消点赞成更新了视频的点赞数"};
        }else{
            // 没点赞，就添加点赞记录
            const newLikeRecord = this.like.create({userId,videoId});
            await this.like.save(newLikeRecord);
            await this.video.increment({id:videoId},'likeCount',1);
            return {msg:"已点赞成功并更新了视频的点赞数"};

        }
        // let data = new Like();
        // data.userId = query.userId;
        // data.videoId = query.videoId;
        // await this.like.save(data);
        // const video = await this.video.findOne({where:{id:query.videoId}});
        // video.likeCount += 1;
        // await this.video.save(video);
        // // 还要添加一条给被赞用户的点赞消息
        return {msg:"已点赞成功并更新了视频的点赞数"};
    }

    // 查询是否点赞了
    async isLike(@Query() query){
        let {userId,videoId} = query;
        let res = await this.like.findOne({
            where:{userId,videoId}
        });
        console.log(res);
        if(!res){
            return "该用户没点赞此视频";
        }else{
            return "该用户已点赞此视频"
        }
    }

}

