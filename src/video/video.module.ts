import { Module } from "@nestjs/common";
import { VideoController } from "./video.controller";
import { VideoService } from "./video.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Video } from "./entities/video.entity";
// import { FollowingService } from "src/following/following.service";
import { FollowingModule } from 'src/following/following.module';

@Module({
    imports: [TypeOrmModule.forFeature([Video]),FollowingModule],
    controllers: [VideoController],
    providers: [VideoService],

})
export class VideoModule { }