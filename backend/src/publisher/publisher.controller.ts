import { Controller, Post, Body } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('publisher')
export class PublisherController {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly clientKafka: ClientKafka,  // Ensure that the 'KAFKA_CLIENT' is correctly injected
  ) {}

  @Post()
  async publishMessage(@Body() body: { message: string }) {
    const message = body.message;

    try {
      // Send the message to Kafka topic
      await this.clientKafka.send('database.updated', { message });
      console.log('Message sent to Kafka:', message);
      return { status: 'Message published' };
    } catch (error) {
      console.error('Error publishing message to Kafka:', error);
      throw error;
    }
  }
}
