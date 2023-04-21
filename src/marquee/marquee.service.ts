import { Injectable } from '@nestjs/common';
import { Marquee } from './entities/marquee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MarqueeService {
    constructor(@InjectRepository(Marquee) private readonly marquee:Repository<Marquee>){}

    // 返回视频弹幕
    getMarquee(query){
        let {video_id} = query;
        return this.marquee.find({
            where:{
                video_id
            }
        })
    }

    // 添加弹幕
    addMarquee(query){
        let oneMarquee = new Marquee();
        oneMarquee.content = query.content;
        oneMarquee.color = query.color;
        oneMarquee.time = query.time;
        oneMarquee.video_id = query.video_id;
        oneMarquee.sender_id = query.sender_id;
        return this.marquee.save(oneMarquee);
    }
}
