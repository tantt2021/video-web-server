import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Star } from './entities/star.entity';
import { Video } from 'src/video/entities/video.entity';
import { Message } from 'src/message/entities/message.entity';
import { StarController } from './star.controller';
import { StarService } from './star.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Star,Message,Video]),
  ],
  providers:[StarService],
  controllers: [StarController]
})
export class StarModule {}
