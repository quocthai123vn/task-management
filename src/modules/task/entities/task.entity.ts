import { BaseEntity } from 'src/modules/typeorm/base-entity';
import { TaskStatus } from 'src/shares/constants/enum.constant';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('task')
export class Task extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ObjectIdColumn()
  assignTo: string;

  @Column()
  priority: number;

  @Column()
  status: TaskStatus;

  constructor() {
    super();
    this.status = TaskStatus.new;
    this.priority = 0;
  }
}
