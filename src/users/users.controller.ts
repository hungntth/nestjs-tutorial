import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDto } from './dto/signup-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  signup(@Body() body: SignupUserDto) {
    return this.usersService.signup(body);
  }
}
