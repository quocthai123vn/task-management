import { BaseEntity } from 'src/modules/typeorm/base-entity';
import { BeforeInsert, Column, Entity, ObjectIdColumn } from 'typeorm';
import { validate } from 'class-validator';
import { AccountRoleEnum } from 'src/shares/constants/enum.constant';

@Entity('account')
export class Account extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  hashPassword: string;

  @Column({ enum: AccountRoleEnum })
  role: AccountRoleEnum;

  @Column()
  isActive: boolean;

  constructor() {
    super();
    this.isActive = false;
    this.hashPassword = '';
  }

  @BeforeInsert()
  async validateEntity() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new Error('Validation failed');
    }
  }
}
