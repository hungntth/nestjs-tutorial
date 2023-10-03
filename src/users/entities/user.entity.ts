import { Roles } from '../../utility/common/user-roles.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn
} from 'typeorm';

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
}
