import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'Sản phẩm không hợp lệ' })
  @IsNumber()
  productId: number;

  @IsNotEmpty({ message: 'Đánh giá không hợp lệ' })
  @IsNumber()
  ratings: number;

  @IsNotEmpty({ message: 'Comment không hợp lệ' })
  @IsString()
  comment: string;
}
