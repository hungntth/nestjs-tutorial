import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepo: Repository<ReviewEntity>,
    private readonly productService: ProductsService,
  ) {}
  async create(createReviewDto: CreateReviewDto, currentUser: UserEntity) {
    const product = await this.productService.findOne(
      createReviewDto.productId,
    );
    let review = await this.findOneByUserAndProduct(
      currentUser.id,
      createReviewDto.productId,
    );
    if (!review) {
      review = this.reviewRepo.create(createReviewDto);
      review.user = currentUser;
      review.product = product;
    } else {
      review.comment = createReviewDto.comment;
      review.ratings = createReviewDto.ratings;
    }
    return this.reviewRepo.save(review);
  }

  findAll() {
    return `This action returns all review`;
  }

  async findOne(id: number) {
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    if (!review) throw new NotFoundException('Review không tồn tại');
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    return this.reviewRepo.remove(review);
  }

  async findOneByUserAndProduct(userId: number, productId: number) {
    return await this.reviewRepo.findOne({
      where: {
        user: {
          id: userId,
        },
        product: {
          id: productId,
        },
      },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
  }

  async findAllProduct(id: number) {
    const product = await this.productService.findOne(id);
    return await this.reviewRepo.find({
      where: { product: { id } },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
  }
}
