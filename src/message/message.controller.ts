import { Controller, Post,Query } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(private messageService:MessageService){}

    // 获取某人的某个消息列表
    @Post("getMessage")
    getMessage(@Query() query):any{
        console.log("用户请求获取消息列表",query);
        return this.messageService.getMessages(query);  
    }

    // 
    @Post("addMessage")
    addMessage(@Query() query){
        console.log("生成消息");
        return this.messageService.addMessage(query);
    }

}
