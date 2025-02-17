import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PublisherEntity } from '../publisher/publisher.entity';
import { SubscriberService } from '../subscriber/subscriber.service';
import { SubscriberController } from '../subscriber/subscriber.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PublisherEntity])],
  providers: [SubscriberService],
  controllers: [SubscriberController],
})
export class SubscriberModule {}
