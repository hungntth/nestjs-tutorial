import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import { SigninUserDto } from './signin-user.dto';

export class SignupUserDto extends SigninUserDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString({ message: 'Tên sai định dạng' })
  name: string;
}
