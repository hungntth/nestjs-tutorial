import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { CurrentUserDecorator } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  signup(@Body() body: SignupUserDto) {
    return this.usersService.signup(body);
  }

  @Post('signin')
  signin(@Body() body: SigninUserDto) {
    return this.usersService.signin(body);
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('by-id/:id')
  findOne(@Param('id') id: number){
    return this.usersService.findById(id)
  }

  @Get('me')
  profile(@CurrentUserDecorator() currentUser: UserEntity){
    return currentUser
  }
}
