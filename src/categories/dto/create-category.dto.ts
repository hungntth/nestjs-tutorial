import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({message: 'Tiêu đề không được để trống.'})
    @IsString({message: 'Tiêu đề không đúng định dạng'})
    title: string;

    @IsNotEmpty({message: 'Mô tả không được để trống.'})
    @IsString({message: 'Mô tả không đúng định dạng'})
    description: string;

}
