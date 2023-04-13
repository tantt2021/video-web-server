import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';
import { HistoryController } from './history.controller';
@Module({
  imports:[TypeOrmModule.forFeature([History])],
  providers: [HistoryService],
  controllers:[HistoryController],
})
export class HistoryModule {}
