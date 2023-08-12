import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bullmq';
import { ImageOptimizationProcessor } from './flash-cards.processor';
import { AppListener } from './app.listener';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'image:optimize',
      prefix: 'flash-cards',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ImageOptimizationProcessor, AppListener],
})
export class AppModule {}
