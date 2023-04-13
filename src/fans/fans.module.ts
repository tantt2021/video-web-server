import { Module } from '@nestjs/common';
import { FansController } from './fans.controller';
import { FansService } from './fans.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fans } from './entities/fans.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [FansController],
  providers: [FansService],
  imports: [TypeOrmModule.forFeature([Fans]),TypeOrmModule.forFeature([User])],
  exports:[FansService]
})
export class FansModule {}
