import { NestFactory } from '@nestjs/core';
import { UserAppModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserAppModule,
    {
      transport: Transport.TCP,
      options: { host:"host.docker.internal",port:3002 },
    },
  );
  await app.listen();
  console.log('User microservice is listening on port 3002');
}
bootstrap();
