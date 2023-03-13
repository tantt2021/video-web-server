/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoService {
    constructor(
        @InjectRepository(Video) private readonly video: Repository<Video>
    ) { }

    addVideo() {
        const data = new Video();
        data.title = '震惊';
        data.likeCount = 12;
        data.id = 124;
        data.author = '小红';
        data.videoFile = "file";
        // data.tag = "tag";
        data.introduction = "introduction";
        data.duration = 122;
        data.likeCount = 1;
        data.starCount = 3;
        data.views = 12;
        data.uuid = "1eww";

        return this.video.save(data);
    }

    delVideo(id: number) {
        return this.video.delete(id);
    }

    updateVideo(id: number) {
        let data = new Video();
        data.author = "王小美";
        return this.video.update(id, data);
    }

    getAllVideos() {
        return this.video.find();
    }

    getVideoByTitle(title: string) {
        return this.video.find({
            where: {
                title: Like(`%${title}%`)
            }
        })
    }
}
