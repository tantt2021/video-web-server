import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Video } from 'src/video/entities/video.entity';
import { Message } from 'src/message/entities/message.entity';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { Comment } from 'src/comment/entities/comment.entity';
import { Dynamic } from 'src/dynamic/entities/dynamic.entity';

@Module({
  providers: [LikeService],
  imports:[
    TypeOrmModule.forFeature([Like,Video,Message,Comment,Dynamic]),
  ],
  controllers:[LikeController],
})
export class LikeModule {}
