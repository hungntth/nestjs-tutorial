import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}
  create(createCategoryDto: CreateCategoryDto, currentUser: UserEntity) {
    const category = this.categoryRepo.create(createCategoryDto);
    category.addedBy = currentUser;
    return this.categoryRepo.save(category);
  }

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: {
        id,
      },
      relations: { addedBy: true },
      select: {
        addedBy: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
    if (!category) throw new NotFoundException('Loại sản phẩm không tồn tại');
    return category;
  }

  async update(id: number, fields: Partial<UpdateCategoryDto>) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('Category không tồn tại');
    Object.assign(category, fields);
    return this.categoryRepo.save(category);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
