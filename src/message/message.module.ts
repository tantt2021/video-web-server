import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageController } from './message.controller';

@Module({
  providers: [MessageService],
  imports:[TypeOrmModule.forFeature([Message])],
  controllers:[MessageController]
})
export class MessageModule {}
