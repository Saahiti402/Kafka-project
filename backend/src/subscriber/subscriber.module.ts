import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SubscriberService } from './subscriber.service';
import { SubscriberController } from './subscriber.controller';
import { PublisherEntity } from '../publisher/publisher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublisherEntity]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'], // Ensure this matches your Kafka setup
          },
          consumer: {
            groupId: 'subscriber-group',
          },
        },
      },
    ]),
  ],
  providers: [SubscriberService],
  controllers: [SubscriberController],
})
export class SubscriberModule {}
