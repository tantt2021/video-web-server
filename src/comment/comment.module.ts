import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentController } from './comment.controller';
import { Comment } from './entities/comment.entity';
import { Video } from 'src/video/entities/video.entity';
import { Dynamic } from 'src/dynamic/entities/dynamic.entity';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  imports:[TypeOrmModule.forFeature([Comment,Video,Dynamic])],
  providers:[CommentService]
})
export class CommentModule {}
