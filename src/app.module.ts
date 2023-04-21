import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoController } from './video/video.controller';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';
// 邮件
import { MailerModule } from '@nestjs-modules/mailer';
// import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { EmailController } from "./email/email.controller";
import { EmailService } from './email/email.service';
import { FollowingModule } from './following/following.module';
import { FansModule } from './fans/fans.module';
import { HistoryModule } from './history/history.module';

// 视频保存成静态资源
import { ServeStaticModule } from '@nestjs/serve-static';
import { join,extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';

// import {diskStorage} from 'multer'
import { StarService } from './star/star.service';
import { StarModule } from './star/star.module';
import { MessageController } from './message/message.controller';
import { MessageModule } from './message/message.module';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { MarqueeService } from './marquee/marquee.service';
import { MarqueeModule } from './marquee/marquee.module';
import { DynamicModule } from './dynamic/dynamic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '1.12.240.146',
      port: 3306,
      username: 'tantt',
      password: '!Tan402010',
      database: 'videoWeb',
      charset: 'utf8mb4',
      extra: {
        collation: 'utf8mb4_unicode_ci',
      },
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    VideoModule,
    UserModule,
    FansModule,
    FollowingModule,
    HistoryModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.qq.com',
        port: 465,
        
        ignoreTLS: true,
        secure: true,
        auth: {
          user: '2746702220@qq.com',
          pass: 'qkupqcroodezdddf',
        },
      },
      defaults: {
        from: '"video server" 2746702220@qq.com',
      },
      preview: false,
      template: {
        dir: process.cwd() + '/template/',
        adapter: new EjsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
    }),
    StarModule,
    MessageModule,
    CommentModule,
    LikeModule,
    ChatModule,
    MarqueeModule,
    DynamicModule,
  ],
  controllers: [AppController,EmailController],
  providers: [AppService,EmailService],
})
export class AppModule { }
