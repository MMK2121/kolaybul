import { NestFactory } from '@nestjs/core';
import { BookingAppModule } from './booking.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BookingAppModule,
    {
      transport: Transport.TCP,
      options: {port:3005 },
    },
  );
  await app.listen();
  console.log('Booking microservice is listening on port 3005');
}
bootstrap();
