import { NestFactory } from '@nestjs/core';
import { ListingAppModule } from './listing.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ListingAppModule,
    {
      transport: Transport.TCP,
      options: { host:"host.docker.internal",port:3004 },
    },
  );
  await app.listen();
  console.log('Listing microservice is listening on port 3002');
}
bootstrap();
