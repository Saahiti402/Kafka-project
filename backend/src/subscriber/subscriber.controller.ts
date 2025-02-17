import { Controller } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MessagePattern } from '@nestjs/microservices';  // Correct import here

@Controller('subscriber')
export class SubscriberController {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly clientKafka: ClientKafka,  // Ensure 'KAFKA_CLIENT' is used here as well
  ) {}

  @MessagePattern('database.updated')  // Listen to the Kafka topic
  async handleMessage(message: any) {
    console.log('Received message from Kafka:', message);
    // Handle the message here (e.g., update database, notify subscriber, etc.)
    return { status: 'Message received and processed' };
  }
}
