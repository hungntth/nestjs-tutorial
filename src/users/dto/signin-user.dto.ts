import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email sai định dạng' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Length(6, 20, {
    message: 'Độ dài mật khẩu từ 6 đến 20 ký tự',
  })
  password: string;
}
