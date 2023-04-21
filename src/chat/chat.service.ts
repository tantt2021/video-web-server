import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const mysql = require('mysql2/promise');
import { User } from 'src/user/entities/user.entity';

interface Query{
    type:string,
    receiver_id:string,
    message_text:string,
    sender_id:string,
    userId:string,
}
@Injectable()
export class ChatService {
        
    constructor(
        @InjectRepository(User) private readonly user:Repository<User>,
    ){}
    // 获取某个人的全部消息记录
    async getChat(query:Query){
        let {userId} = query;
        const connection = await mysql.createConnection({
            host: '1.12.240.146',
            user: 'tantt',
            password: '!Tan402010',
            database: 'videoWeb'
        });
        
        const [rows] = await connection.execute(
            `SELECT * 
             FROM chat
             WHERE sender_id = '${userId}'
             OR receiver_id = '${userId}'
             ORDER BY createTime ASC;
            `
        );
        const conversation = await this.turnChatHistory(rows,userId);
        console.log("聊天记录",conversation);
        return conversation;
    }

     // 组合成聊天记录返回
   async turnChatHistory(messages,userId){
    // userId是接收的，不等于userId就是对方
    const conversations = await Promise.all(messages.reduce((acc, message) => {
        const { sender_id, receiver_id } = message;
        const key = sender_id < receiver_id ? `${sender_id}-${receiver_id}` : `${receiver_id}-${sender_id}`;
        const conversation = acc.find(convo => convo.key === key);
        if (conversation) {
          conversation.messages.push(message);
        } else {
          acc.push({
            key,
            participants: [sender_id, receiver_id],
            messages: [message],
          });
        }
        return acc;
      }, []).map(async conversation => {
        const [sender_id, receiver_id] = conversation.participants;
        const [uname,userID] = await this.getUname(sender_id, receiver_id, userId);
        conversation.uname = uname;
        conversation.userID = userID;
        return conversation;
      }));
    return conversations;
}

// 获取用户名
async getUname(sender_id, receiver_id,userId){
    if(sender_id===userId){
        // receiver_id是对方用户名
        let user =  await this.user.findOne({
            where:{
                id:receiver_id
            }
        })
        return [user.uname,receiver_id];
    }else{
        let user = await this.user.findOne({
            where:{
                id:sender_id
            }
        })
        return [user.uname,sender_id];
    }
    
}
}
