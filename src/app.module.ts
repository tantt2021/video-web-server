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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'tantt',
      database: 'nestvideo',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    VideoModule,
    UserModule,
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

  ],
  controllers: [AppController,EmailController],
  providers: [AppService,EmailService],
})
export class AppModule { }
