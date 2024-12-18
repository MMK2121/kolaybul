import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ReviewAppModule } from './review.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ReviewAppModule,
    {
      transport: Transport.TCP,
      options: {port:3003 },
    },
  );
  await app.listen();
  console.log('Review microservice is listening on port 3002');
}
bootstrap();
