import { Controller, Get, Query, Request, Post, Body, Param } from '@nestjs/common';
import { VideoService } from './video.service';

// 类装饰器
// 装饰器的作用：扩展功能
@Controller('video')
export class VideoController {
    constructor(private videoService: VideoService) { }

    @Get("/add")
    addVideo(): any {
        return this.videoService.addVideo()
    }

    @Get('/delete/:id')
    deleteVideo(@Param() params): any {
        let id: number = parseInt(params.id);
        return this.videoService.delVideo(id);
    }

    @Get('/update/:id')
    updateVideo(@Param() params): any {
        let id: number = parseInt(params.id);
        return this.videoService.updateVideo(id);
    }

    @Get()
    getAllVideos() {
        return this.videoService.getAllVideos();
    }

    @Get('/findVideoByTitle/:title')
    findVideoByTitle(@Param() params): any {
        let title: string = params.title;
        console.log('查询video,title为' + title);

        return this.videoService.getVideoByTitle(title);
    }

    // // 方法装饰器
    // @Get() 
    // index(){ //方法名随意写
    //     return "<h2>我是视频页面</h2>"
    // }

    // @Get("m1") 
    // index1(){ //方法名随意写
    //     return "<h2>我是视频页面2</h2>"
    // }

    // // http://127.0.0.1:3000/video/add?a=2&b=mike
    // @Get("add")
    // // @Query方法参数装饰器
    // addData(@Query() query) {
    //     console.log(query);
    //     return query;
    // }

    // @Get('edit')
    // editData(@Request() req) {
    //     console.log(req.query);
    //     return "通过request获取get传值";
    // }

    // // 通过Body装饰器获取post传过来的数据
    // @Post("create")
    // create(@Body() data) {
    //     console.log(data);
    //     return "我是post请求";

    // }
    // // 只获取某个参数
    // @Get("show")
    // show(@Query("id2") id) {
    //     console.log(id);
    //     return "获取id";
    // }

    // // 获取动态路由
    // // http://127.0.0.1:3000/video/1
    // @Get(":id")
    // param(@Param() param) {
    //     console.log(param);
    //     return "这是新闻页面";

    // }


}
