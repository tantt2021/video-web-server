import { Module } from "@nestjs/common";
import { VideoController } from "./video.controller";
import { VideoService } from "./video.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Video } from "./entities/video.entity";
import { Comment } from 'src/comment/entities/comment.entity';
import { Star } from 'src/star/entities/star.entity';
import { History } from 'src/history/entities/history.entity';
import { Marquee } from 'src/marquee/entities/marquee.entity';
import { Like } from 'src/like/entities/like.entity';
// import { FollowingService } from "src/following/following.service";
import { FollowingModule } from 'src/following/following.module';

@Module({
    imports: [TypeOrmModule.forFeature([Video,Comment,Star,History,Marquee,Like]),FollowingModule],
    controllers: [VideoController],
    providers: [VideoService],

})
export class VideoModule { }