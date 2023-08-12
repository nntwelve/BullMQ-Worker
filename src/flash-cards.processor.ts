import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('image:optimize', {
  concurrency: 5,
  // lockDuration: 3000,
  limiter: {
    max: 1,
    duration: 60000,
  },
})
export class ImageOptimizationProcessor extends WorkerHost {
  private logger = new Logger();

  @OnWorkerEvent('active')
  onQueueActive(job: Job) {
    console.log(`Processor 1: Job has been started: ${job.id}`);
  }

  async process(job: Job<any, any, string>, token?: string): Promise<any> {
    switch (job.name) {
      case 'optimize-size':
        const optimzied_image = await this.optimizeImage(job.data);
        return optimzied_image;

      default:
        throw new Error('No job name match');
    }
  }

  async optimizeImage(image: unknown) {
    this.logger.log('Processing image....');
    return await new Promise((resolve) =>
      setTimeout(() => resolve(image), 30000),
    );
  }
}
