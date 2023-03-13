import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置虚拟目录
  app.useStaticAssets(join(__dirname, 'images'))
  await app.listen(3005);
  console.log("listen in 3005");

}
bootstrap();
