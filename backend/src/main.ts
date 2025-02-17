import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Kafka configuration for publisher
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'], // Kafka broker URL
      },
      consumer: {
        groupId: 'subscriber-group-client', // Consumer group ID for subscriber
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000); // Start the HTTP server on port 3000
  console.log('NestJS application is running on http://localhost:3000');
}
bootstrap();
