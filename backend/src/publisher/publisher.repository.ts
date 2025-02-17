import { EntityRepository, Repository } from 'typeorm';
import { PublisherEntity } from './publisher.entity';

@EntityRepository(PublisherEntity)
export class PublisherRepository extends Repository<PublisherEntity> {}
