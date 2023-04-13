import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
interface Query{
    type:string,
    receiver_id:string,
    message_text:string,
    sender_id:string,
}
@Injectable()
export class MessageService {
    constructor(@InjectRepository(Message) private readonly message:Repository<Message>){}
    // 获取某个人的全部消息记录
    getMessages(query:Query){
        let {type,receiver_id} = query;
        return this.message.find({
            where:{
                type,
                receiver_id
            }
        })
    }

    // 生成消息记录
    addMessage(query:Query){
        let data = new Message();
        data.is_read = false;
        data.message_text = query.message_text;
        data.receiver_id = query.receiver_id;
        data.sender_id = query.sender_id;
        data.type = query.type;

        return this.message.save(data);
    }
}
