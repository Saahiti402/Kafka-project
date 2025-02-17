import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublisherEntity } from '../publisher/publisher.entity';
import { ClientKafka, Payload, EventPattern } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class SubscriberService implements OnModuleInit {
  constructor(
    @InjectRepository(PublisherEntity)
    private publisherRepository: Repository<PublisherEntity>,

    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('database.updated');
    await this.kafkaClient.connect();
  }

  @EventPattern('database.updated')
  async handleDatabaseUpdate(@Payload() data: { id: number; title: string; message: string }) {
    console.log(`Received update: ID=${data.id}, Title=${data.title}, Message=${data.message}`);

    // Simulate further processing or notifying frontend
    return { success: true, data };
  }
}
