import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { SignupUserDto } from './dto/signup-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  signup(body: SignupUserDto) {
    const user = this.usersRepository.create(body);
    return this.usersRepository.save(user);
  }
}
