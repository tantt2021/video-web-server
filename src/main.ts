import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from "path";
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { AllExceptionFilter } from './core/filter/all-exception.filter/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置虚拟目录
  app.useStaticAssets(join(__dirname, 'images'))
  app.useGlobalInterceptors(new TransformInterceptor());//请求成功拦截
  app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors();   //跨域
  await app.listen(3005);
  console.log("listen in 3005");

}
bootstrap();
