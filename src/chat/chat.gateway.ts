import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server,Socket } from 'socket.io';
import { Message } from '../message/entities/message.entity';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
interface OnlineUser{
    [key: string]: string;
}
@WebSocketGateway(9892, { cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection,  OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  // 在线用户
  onlineUsers: OnlineUser = {};
  
  constructor(
    @InjectRepository(Chat) private readonly chat: Repository<Chat>,
  ) {
    // 初始化在线用户对象
    this.onlineUsers = {};
  }

  @SubscribeMessage('mess')
  handleMessage(client: Socket, payload: any): void {
    const {from , to , text} = payload;

    // client.broadcast.emit('mess',payload);
    // 判断对方是否在线，在线直接转发，不在存在消息列表
    // 找到目标用户的 Socket 实例
    console.log(Object.keys(this.onlineUsers).includes(to),this.onlineUsers,to);
    
    if(Object.keys(this.onlineUsers).includes(from)){
        const key = to < from ? `${to}-${from}` : `${from}-${to}`;
        payload.text.key = key;
        // 在线
        this.server.to(this.onlineUsers[to]).emit("privateMessage",payload.text);
        // 存入数据库
        console.log("text",text);
        text.is_read = false;
        this.chat.save(text);

    }else{
        // 不在线，存数据库
        console.log("离线消息",text);
        text.is_read = false;
        this.chat.save(text);
    }
  }

  //   添加在线用户
  @SubscribeMessage('addUser')
  onlineUser(client: Socket, payload: string): void {
    console.log("添加在线用户",payload);
    console.log(this.onlineUsers);
    Object.assign(this.onlineUsers, { [payload]: client.id });
    console.log("当前在线人：",this.onlineUsers);
    
  }

  async afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  async handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
