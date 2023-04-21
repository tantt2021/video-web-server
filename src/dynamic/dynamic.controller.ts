import { Controller, Query, Post, UseInterceptors, UploadedFile, UploadedFiles, Body } from '@nestjs/common';
import { DynamicService } from './dynamic.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createWriteStream } from 'fs';

@Controller('dynamic')
export class DynamicController {
    constructor(
        private dynamicService:DynamicService
    ){}

    // 获取动态
    @Post('getDynamic')
    getDynamic(@Query() query){
        console.log("用户查看动态",query);
        return this.dynamicService.getDynamic(query);
    }

    // 添加动态
    @Post('addDynamic')
    @UseInterceptors(FileFieldsInterceptor([
        {name:'img',maxCount:9},
    ]))
    async addDynamic(@UploadedFiles() files, @Body() body){
        console.log("用户添加动态",body);
        console.log("动态的图片文件",files);
        body.imgArr = "";  // 后端处理imgArr字段
        const promises = [];
        if(Object.keys(files).length >0){
            for(let i = 0; i < files["img"].length; i++){
                const promise = new Promise((resolve,reject)=>{
                    let imgName = `${new Date().getTime()}.${files["img"][i].originalname.split(".")[1]}`;
                    const imgPath = join(__dirname,'../..','public','images',imgName);
                    let stream = createWriteStream(imgPath);
                    stream.on('finish',resolve);
                    stream.on("error",reject);
                    stream.write(files["img"][i].buffer);
                    body.imgArr += `http://localhost:3005/images/${imgName}&&`;
                    stream.end();
                })
                promises.push(promise);
            }
                console.log(promises,"pro");
        }
        await Promise.all(promises);
        return this.dynamicService.addDynamic(body);
    }
}
