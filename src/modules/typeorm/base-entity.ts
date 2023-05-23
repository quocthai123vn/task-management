import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @Column({
    default: false,
  })
  isDelete: boolean;

  @Column({
    default: '',
  })
  updatedBy: string;
}
