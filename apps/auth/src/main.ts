import { NestFactory } from '@nestjs/core';
import { AuthAppModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthAppModule,
    {
      transport: Transport.TCP,
      options: { host:"host.docker.internal",port:3001 },
    },
  );
  await app.listen();
  console.log('Auth microservice is listening on port 3001');
}
bootstrap();
