import { Module } from '@nestjs/common';
import { FollowingService } from './following.service';
import { FollowingController } from './following.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Following } from './entities/following.entity';
import { User } from 'src/user/entities/user.entity';
import { FansModule } from 'src/fans/fans.module';

@Module({
  imports: [TypeOrmModule.forFeature([Following,User]),FansModule],
  controllers: [FollowingController],
  providers: [FollowingService,],
  exports: [FollowingService,],
})
export class FollowingModule {}
