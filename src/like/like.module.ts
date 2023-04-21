import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Video } from 'src/video/entities/video.entity';
import { Message } from 'src/message/entities/message.entity';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';

@Module({
  providers: [LikeService],
  imports:[
    TypeOrmModule.forFeature([Like,Video,Message]),
  ],
  controllers:[LikeController],
})
export class LikeModule {}
