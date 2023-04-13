import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

import { FollowingModule } from 'src/following/following.module';
@Module({
imports: [TypeOrmModule.forFeature([User]),FollowingModule],
  providers: [UserService,],
  controllers: [UserController],

})
export class UserModule { }
