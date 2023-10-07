import { CategoryEntity } from 'src/categories/entities/category.entity';
import { Roles } from '../../utility/common/user-roles.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ReviewEntity } from 'src/review/entities/review.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_user_id' })
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ select: false })
  password: string;
  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
  roles: Roles;
  @CreateDateColumn()
  createAt: Timestamp;
  @UpdateDateColumn()
  updateAt: Timestamp;

  @OneToMany(() => CategoryEntity, (cat) => cat.addedBy)
  categories: CategoryEntity[];

  @OneToMany(() => ProductEntity, (prod) => prod.addedBy)
  products: ProductEntity[];

  @OneToMany(() => ReviewEntity, (revw) => revw.user)
  reviews: ReviewEntity[];
}
