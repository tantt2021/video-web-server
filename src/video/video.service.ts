/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository, Like,DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
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
        @InjectRepository(Video) private readonly video: Repository<Video>,
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
    
}
