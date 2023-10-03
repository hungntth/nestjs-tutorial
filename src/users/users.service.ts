import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { SignupUserDto } from './dto/signup-user.dto';
import * as bcrypt from 'bcrypt';
import { SigninUserDto } from './dto/signin-user.dto';
import { sign } from 'jsonwebtoken';

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
    return this.accessToken(user);
  }

  async signin(body: SigninUserDto) {
    const userExist = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: body.email })
      .getOne();
    const isMatch = await bcrypt.compare(body.password, userExist.password);
    if (!userExist || !isMatch)
      throw new BadRequestException('Email hoặc mật khẩu không đúng!');

    return this.accessToken(userExist);
  }

  async accessToken(user: UserEntity) {
    delete user.password;
    const accessToken = await sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_JWT,
      { expiresIn: process.env.EXPIRES_IN },
    );

    return { accessToken, user };
  }

  findAll() {
    return this.usersRepository.find();
  }

  findById(id: number) {
    return this.usersRepository.findOneBy({id})
  }
}
