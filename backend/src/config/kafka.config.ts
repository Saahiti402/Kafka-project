import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.KAFKA_BROKER) {
  throw new Error('KAFKA_BROKER environment variable is not defined.');
}

export const kafkaConfig: ClientsModuleOptions = [
  {
    name: 'KAFKA_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER as string], // Ensures it's a string
      },
      consumer: {
        groupId: 'my-consumer',
      },
    },
  },
];
