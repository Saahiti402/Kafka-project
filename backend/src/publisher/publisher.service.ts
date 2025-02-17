import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublisherEntity } from './publisher.entity';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(PublisherEntity)
    private publisherRepository: Repository<PublisherEntity>,

    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka
  ) {}

  async createPublisher(title: string, message: string) {
    const newEntry = this.publisherRepository.create({ title, message });
    await this.publisherRepository.save(newEntry);

    // Emit event to Kafka
    this.kafkaClient.emit('database.updated', { id: newEntry.id, title, message });

    return newEntry;
  }

  async getAllPublishers() {
    return this.publisherRepository.find();
  }
}
