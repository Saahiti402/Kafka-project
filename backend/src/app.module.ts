import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { PublisherController } from './publisher/publisher.controller';
import { SubscriberController } from './subscriber/subscriber.controller';

@Module({
  imports: [
    // Register Kafka client
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',  // Make sure this matches the injection identifier in your controller
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],  // Kafka broker URL
          },
          consumer: {
            groupId: 'subscriber-group-client',  // Consumer group ID
          },
        },
      },
    ]),
  ],
  controllers: [PublisherController, SubscriberController],
})
export class AppModule {}
