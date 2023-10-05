import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { CurrentUserDecorator } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';

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
  findOne(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @UseGuards(AuthorizeGuard([Roles.ADMIN, Roles.USER]))
  @Get('me')
  profile(@CurrentUserDecorator() currentUser: UserEntity) {
    return currentUser;
  }
}
