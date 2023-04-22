import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { Video } from 'src/video/entities/video.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Message } from 'src/message/entities/message.entity';
import { Dynamic } from 'src/dynamic/entities/dynamic.entity';
interface LikeType{
    userId:string,
    hostId:string,
    id:string,
    type:string,
}

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like)
        private like:Repository<Like>,
        @InjectRepository(Video)
        private video:Repository<Video>,
        @InjectRepository(Message)
        private message:Repository<Message>,
        @InjectRepository(Comment)
        private comment:Repository<Comment>,
        @InjectRepository(Dynamic)
        private dynamic:Repository<Dynamic>,
    ){}

    
    // 处理点赞和取消赞
    async toggleLike(@Query() query:LikeType){
        let {userId,hostId,type} = query;
        const likeRecord = await this.like.findOne({
            where:{userId,hostId}
        });
        console.log(likeRecord);  // 判断存不存在
        
        // 查询作者,消息接收者
        let author = '';
        // 根据hostId找到发布者，通过message通知
        // 点赞情况：评论，动态，视频
        if(type === 'video'){
            ({authorId:author} = await this.video.findOne({
                where:{
                    id:hostId
                }
            }));
        }else if(type === 'dynamic'){
            ({user:author} = await this.dynamic.findOne({
                where:{
                    id:hostId
                }
            }));
        }else{
            ({user_id:author} = await this.comment.findOne({
                where:{
                    id:hostId
                }
            }));
        }
        if(likeRecord){
            // 已经点过赞
            console.log(likeRecord,"likeRecord");
            
            await this.like.remove(likeRecord);  // 删除点赞记录
            let messageRecord = await this.message.findOne({where:{
                sender_id:userId,
                receiver_id:author,
                type:'video',
                message_text: '点赞',
                operate: "点赞",
                target_id: hostId,
            }});
            console.log(messageRecord,"msgRecord");
            
            await this.message.remove(messageRecord);  // 删除消息
            if(type === 'video')
                await this.video.decrement({id:hostId},'likeCount',1);
            else if(type === 'dynamic'){
                await this.dynamic.decrement({id:hostId},'likeCount',1);
            }else{
                await this.comment.decrement({id:hostId},'likeCount',1);
            }
            return {msg:`已取消点赞成更新了${type}点赞数`};
        }else{
            // 没点赞，就添加点赞记录
            const newLikeRecord = this.like.create({userId,hostId,type});
            await this.like.save(newLikeRecord);
            if(type === 'video')
                await this.video.increment({id:hostId},'likeCount',1);
            else if(type === 'dynamic')
                await this.dynamic.increment({id:hostId},'likeCount',1);
            else
                await this.comment.increment({id:hostId},'likeCount',1);
            // 发送消息
            let newLikeMess = new Message();
            // 点赞消息
            newLikeMess.is_read = false;
            newLikeMess.message_text = "点赞";
            newLikeMess.operate = "点赞";
            newLikeMess.type = type;
            newLikeMess.receiver_id = author;
            newLikeMess.sender_id = userId;
            newLikeMess.target_id = hostId;
            this.message.save(newLikeMess);
            return {msg:"已点赞成功并更新了${type}的点赞数"};
        }
    }

    // 查询点赞记录
    async isLike(@Query() query){
        let {userId,hostId} = query;
        let res = await this.like.findOne({
            where:{userId,hostId}
        });
        console.log(res);
        if(!res){
            return "该用户没点赞此视频";
        }else{
            return "该用户已点赞此视频"
        }
    }

}

