import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../db/entities/users.entity';
import { UserDTO } from './dto/user.dto';
import { nowString } from 'src/utils/dateNow';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async find(): Promise<UserDTO> {
    try {
      let user = await this.usersRepository.findOne({ where: { id: 1 } });
      if (!user) {
        throw new NotFoundException('нет юзера');
      }
      return user;
    } catch (error) {
      console.log(`ошибка ${error} при поиске юзера${nowString()}`);
    }
  }
}
