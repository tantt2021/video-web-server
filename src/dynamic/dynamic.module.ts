import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicController } from './dynamic.controller';
import { DynamicService } from './dynamic.service';
import { Dynamic } from './entities/dynamic.entity';
import { Following } from 'src/following/entities/following.entity';

@Module({
  controllers: [DynamicController],
  providers: [DynamicService],
  imports:[TypeOrmModule.forFeature([Dynamic,Following])]
})
export class DynamicModule {}
