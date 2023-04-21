import { Module } from '@nestjs/common';
import { MarqueeController } from './marquee.controller';
import { Marquee } from './entities/marquee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarqueeService } from './marquee.service';

@Module({
  imports:[TypeOrmModule.forFeature([Marquee])],
  providers:[MarqueeService],
  controllers: [MarqueeController],

})
export class MarqueeModule {}
