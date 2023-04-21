import { Controller, Query, Post } from '@nestjs/common';
import { MarqueeService } from './marquee.service';

@Controller('marquee')
export class MarqueeController {
    constructor(private marqueeService:MarqueeService){}

    // 获取弹幕 
    @Post("getMarquee")
    getMarquee(@Query() query){
        console.log("查找弹幕,视频id:",query);
        return this.marqueeService.getMarquee(query);
    }

    // 添加弹幕
    @Post("addMarquee")
    addMarquee(@Query() query){
        console.log("添加弹幕,",query);
        return this.marqueeService.addMarquee(query);
    }
}
