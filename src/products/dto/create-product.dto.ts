import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  @IsString({ message: 'Tên sản phẩm sai định dạng' })
  title: string;

  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  @IsString({ message: 'Nội dung sai định dạng' })
  description: string;

  @IsNotEmpty({ message: 'Giá tiền không được để trống' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Giá tiền sai định dạng' })
  @IsPositive({ message: 'Giá tiền sai định dạng' })
  price: number;

  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  @IsNumber({}, { message: '' })
  stock: number;

  @IsNotEmpty({ message: 'Sản phẩm phải có ít nhất 1 ảnh' })
  @IsArray({ message: 'Ảnh sản phẩm sai định dạng' })
  images: string[];

  @IsNotEmpty({ message: 'Category không được để trống' })
  @IsNumber({}, { message: 'Category sai định dạng' })
  category: number;
}
