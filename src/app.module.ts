import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoController } from './video/video.controller';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';

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

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
