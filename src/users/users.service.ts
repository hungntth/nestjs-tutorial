import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { SignupUserDto } from './dto/signup-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(body: SignupUserDto) {
    const userExist = await this.usersRepository.findOne({
      where: { email: body.email },
    });
    if (!!userExist) throw new BadRequestException('Email đã tồn tại!');

    const saltOrRounds = 10;
    body.password = await bcrypt.hash(body.password, saltOrRounds);
    const user = this.usersRepository.create(body);
    await this.usersRepository.save(user);
    delete user.password
    return user
  }
}
