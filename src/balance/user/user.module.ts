import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../db/entities/users.entity';
import { UserService } from './user.service';
import { UsersRepository } from '../db/repositories/ users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Users, UsersRepository])],
  providers: [UserService],
})
export class UserModule {}
