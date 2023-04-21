import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
const mysql = require('mysql2/promise');
interface Query{
    type:string,
    receiver_id:string,
    message_text:string,
    sender_id:string,
    userId:string,
    operate:string,
    target_id:string,
}
@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message) private readonly message:Repository<Message>,
        @InjectRepository(User) private readonly user:Repository<User>,
    ){}
    // 获取某个人的全部消息记录
    async getMessages(query:Query){
        let {type,receiver_id,userId} = query;
        const connection = await mysql.createConnection({
            host: '1.12.240.146',
            user: 'tantt',
            password: '!Tan402010',
            database: 'videoWeb'
        });
        
        // 根据type返回对应模块的消息
        // comment
        const [rows] = await connection.execute(
            `select m.message_text ,m.sender_id,u2.uname as sender_uname , m.createTime ,u.id as receiver_id ,u.avatar,u.uname , m.operate, m.target_id
            FROM message m 
            left join user u  on m.receiver_id = u.id 
            left join user u2 on m.sender_id = u2.id
            where type = '${type}' and receiver_id = '${userId}';`
        )
        return rows;
    }

    // 生成消息记录
    addMessage(query:Query){
        let data = new Message();
        data.is_read = false;
        data.message_text = query.message_text;
        data.receiver_id = query.receiver_id;
        data.sender_id = query.sender_id;
        data.type = query.type;
        data.operate = query.operate;
        data.target_id = query.target_id;
        return this.message.save(data);
    }

   
}
