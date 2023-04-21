import { Controller,Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private chatService:ChatService){}

    @Post("getChatContent")
    getChatContent(@Query() query){
        return this.chatService.getChat(query);
    }
}
