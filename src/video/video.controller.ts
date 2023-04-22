import { Controller, Post, Get, UseInterceptors, UploadedFiles, Body, Query,UploadedFile } from '@nestjs/common';
import { FileInterceptor,FileFieldsInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';
import { createWriteStream } from 'fs';
import { VideoService } from './video.service';
import { FollowingService } from 'src/following/following.service';


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
}
@Controller('video')
export class VideoController {
    constructor(
        private readonly videoService:VideoService,
        private FollowingService:FollowingService,

    ){}
  private readonly UPLOAD_DIR = "./public/videos";

  // 上传小文件（100MB）
  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor([
    {name:'video',maxCount:1},
    {name:'img',maxCount:1},
  ]))
  uploadFile(@UploadedFiles() files,@Body() body){
    console.log("封面&视频文件",files["img"][0],files["video"][0]);
    // 存视频
    const videoName = `${new Date().getTime()}.${files["video"][0].originalname.split(".")[1]}`;
    const videoPath = join(__dirname, '../..', 'public', 'videos', videoName);
    let stream = createWriteStream(videoPath);
    stream.write(files["video"][0].buffer);
    stream.end();
    // 存图片
    const coverName = `${new Date().getTime()}.${files["img"][0].originalname.split(".")[1]}`;
    const coverPath = join(__dirname, '../..', 'public', 'images', coverName);
    stream = createWriteStream(coverPath);
    stream.write(files["img"][0].buffer);
    stream.end();

    // 存标题等信息
    body.cover = `http://localhost:3005/images/${coverName}`;
    body.videoFile = `http://localhost:3005/videos/${videoName}`;
    console.log("请求体",body);
    return this.videoService.addVideo(body);

  }

  @Post("getVideo")
  getVideo(@Query() query){
    console.log("用户请求返回自己的视频数据:",query);
    
    return this.videoService.getVideoByEmail(query);
  }


  // 上传大文件存储具体信息后传ID给前端后 ，前端携带给视频切片接口，改名为ID
  @Post("uploadLargeFileInfo")
  @UseInterceptors(FileFieldsInterceptor([
    {name:'img',maxCount:1},
  ]))
  async uploadInfo(@UploadedFiles() files,@Body() body){
    body.videoFile = "http://localhost:3005/videos/" + new Date().getTime().toString() + ".mp4";
    // 存图片
    const coverName = `${new Date().getTime()}.${files["img"][0].originalname.split(".")[1]}`;
    body.cover = `http://localhost:3005/images/${coverName}`;
    const coverPath = join(__dirname, '../..', 'public', 'images', coverName);
    let stream = createWriteStream(coverPath);
    stream.write(files["img"][0].buffer);
    stream.end();
    return this.videoService.addVideo(body);
  }

  // 上传大文件
  @Post('uploadLargeFile')
  @UseInterceptors(FileInterceptor('chunk'))
  async uploadChunk (
    @UploadedFile() chunk: Express.Multer.File,
    @Body('filename') filename: string,
    @Body('index') index: number,
    @Body('total') total: number
  ) {
    try {
      console.log("大文件传输",filename);
      
      const chunkDir = path.join(this.UPLOAD_DIR, filename)
      if (!fs.existsSync(chunkDir)) {
        fs.mkdirSync(chunkDir)
      }

      const chunkPath = path.join(chunkDir, index.toString())
      if (fs.existsSync(chunkPath)) {
        return { status: 'exist' }
      }

      fs.writeFileSync(chunkPath, chunk.buffer)

      const uploadedChunks = fs.readdirSync(chunkDir)
      console.log(uploadedChunks.length, Number(total));
      
      if (uploadedChunks.length === Number(total)) {
        await this.mergeChunks(filename, total)
      }

      return { status: 'success',progress: uploadedChunks.length};
    } catch (error) {
      console.error(error)
      return { status: 'error' }
    }
  }

  // 文件切片合并
  @Post('merge')
  async mergeChunks (@Body('filename') filename: string, @Body('total') total: number) {
    try {
      console.log("文件切片",filename,total);

      const chunkDir = path.join(this.UPLOAD_DIR, filename)
      const chunks = fs.readdirSync(chunkDir)
      chunks.sort((a, b) => parseInt(a) - parseInt(b))
      const filePath = path.join(this.UPLOAD_DIR, './', filename)
      
      const writable = fs.createWriteStream(filePath)
      for (const chunk of chunks) {
        const chunkPath = path.join(chunkDir, chunk)
        const buffer = fs.readFileSync(chunkPath)
        writable.write(buffer)
        fs.unlinkSync(chunkPath)
      }

      writable.end()
      fs.rmdirSync(chunkDir)
      // 
      return { status: 'success' }
    } catch (error) {
      console.log("error");
      
      console.error(error)
      return { status: 'error' }
    }
  }

  // 获取排行榜
  @Get("getTop")
  async getTop(@Query() query){
    return this.videoService.calculateScore();
  }

  @Post("getOneVideo")
  async getOneVideo(@Query() query){
    console.log("用户请求返回某一个视频",query);
    // 视频信息，是否点赞收藏，发布者信息，videoId,id
    return this.videoService.getOneVideo(query);
  }

  // 获取全部video
  @Get("getAllVideos")
  getAllVideos(){
    console.log("用户获取全部视频");
    return this.videoService.getAllVideos();
  }

  // 删除video
  @Post("delVideo")
  delVideo(@Query() query){
    return this.videoService.delVideo(query);
  }

  @Post("addViews")
  addViews(@Query() query){
    console.log("当前有用户正在观看视频,id为:",query);
    
    return this.videoService.addViews(query);
  }

  
}


