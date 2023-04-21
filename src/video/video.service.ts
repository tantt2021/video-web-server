/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository,DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Star } from 'src/star/entities/star.entity';
import { History } from 'src/history/entities/history.entity';
import { Marquee } from 'src/marquee/entities/marquee.entity';
import { Like } from 'src/like/entities/like.entity';
interface VideoType{
    id:string,
    author?:string,
    authorEmail?:string,
    authorId?:string,
    cover?:string,
    duration?:number,
    introduction?:string,
    title?:string,
    type?:string,
    videoFile?:string,
    views:number,

    userId:string, // 用于查询是否已关注
}
@Injectable()
export class VideoService {
    constructor(
        @InjectRepository(Video) 
        private readonly video: Repository<Video>,
        @InjectRepository(Comment) 
        private readonly comment: Repository<Comment>,
        @InjectRepository(Star) 
        private readonly star: Repository<Star>,
        @InjectRepository(History) 
        private readonly history: Repository<History>,
        @InjectRepository(Marquee) 
        private readonly marquee: Repository<Marquee>,
        @InjectRepository(Like) 
        private readonly like: Repository<Like>,
        private dataSource:DataSource
    ) { }

    addVideo(query:VideoType) {
        const data = new Video();
        data.author = query.author;
        data.authorEmail = query.authorEmail;
        data.authorId = query.authorId;
        data.cover = query.cover;
        data.duration = query.duration;
        data.introduction = query.introduction;
        data.likeCount = 0;
        data.marqueeCount = 0;
        data.shareCount = 0;
        data.starCount = 0;
        data.title = query.title;
        data.type = query.type;
        data.videoFile = query.videoFile;
        data.views = 0;
        return this.video.save(data);
    }

    // 删除视频
    delVideo(query:VideoType) {
        let {id} = query; 
        return this.video.delete(id);
    }

    getAllVideos() {
        return this.video.find();
    }

    getVideoByEmail(query: VideoType) {
        let {authorId} = query;
        return  this.video.find({
            where: {
                authorId
            }
        })
    }

    // 获取视频详情页
    async getOneVideo(query:VideoType){
        let {id} = query;
        return await this.video.findOne({
            where:{
                id
            }
        });
    }

    // 增加播放量
    async addViews(query:VideoType){
        let {id} = query;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const video = await this.video.findOne({where:{id}});
            video.views += 1;
            await this.video.save(video);
        }catch(err){
            await queryRunner.rollbackTransaction();// 回滚
        }finally {
            await queryRunner.release();
        }
    }
    

    // 计算视频综合评分
    async calculateScore() {
        // 找到近期时间<3天的视频，计算权重
        const now = new Date();
        const daysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);//10天内的视频

        let videoData = await this.video.createQueryBuilder('video').where(`video.createTime >= :daysAgo`, { daysAgo })
        .getMany();
        console.log("近期",videoData);
        const w1 = 0.4; // 点赞量权重
        const w2 = 0.3; // 浏览量权重
        const w3 = 0.1; // 评论数权重
        const w4 = 0.1; // 收藏量权重
        const w5 = 0.1; // 弹幕数权重

        let LikeCount = [];
        let ViewCount = [];
        let CommentCount = [];
        let StarCount = [];
        let MarqueeCount = [];
        for(let i = 0; i < videoData.length;i++){
            let like = await this.like.find({
                where:{videoId:videoData[i].id}
            });
            LikeCount.push(like.length);

            ViewCount.push(videoData[i].views);

            let comment = await this.comment.find({
                where:{dynamic_id:videoData[i].id}
            });
            CommentCount.push(comment.length);
            
            StarCount.push(videoData[i].starCount);

            let marquee = await this.marquee.find({
                where:{video_id:videoData[i].id}
            });
            MarqueeCount.push(marquee.length);
        }
        console.log(LikeCount,ViewCount,CommentCount,StarCount,MarqueeCount);
        let scoreArr = [];
        for(let i = 0; i < videoData.length;i++){
            scoreArr[i] = w1 * LikeCount[i] + w2 * ViewCount[i] + w3 * CommentCount[i] + w4 * StarCount[i] + w5 * MarqueeCount[i];
        }
        console.log(scoreArr,"总分");
        // 排序
        let data = videoData.map((value, index) => [value, scoreArr[index]]);
        let sortedData = data.sort((a, b) => b[1] - a[1]);
        let sortedArray1 = sortedData.map(value => value[0]);
        return sortedArray1;

    }
}
