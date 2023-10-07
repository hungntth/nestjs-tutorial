import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    private readonly categoryService: CategoriesService,
  ) {}
  async create(createProductDto: CreateProductDto, currentUser: UserEntity) {
    const category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );
    const product = this.productRepo.create(createProductDto);
    product.category = category;
    product.addedBy = currentUser;
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        addedBy: true,
        category: true,
      },
      select: {
        addedBy: {
          id: true,
          name: true,
          email: true,
        },
        category: {
          id: true,
          title: true,
        },
      },
    });
    if (!product) throw new NotFoundException('Sản phẩm không tồn tại');
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    if (updateProductDto.categoryId) {
      const category = await this.categoryService.findOne(
        updateProductDto.categoryId,
      );
      product.category = category;
    }
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
