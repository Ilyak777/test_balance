import { Entity, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';

@Entity()
export class UsersRepository extends Repository<Users> {}
