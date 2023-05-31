import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/shares/constants/enum.constant';

export class UpdateTaskDto {
  @IsNotEmpty()
  taskId: string;

  @IsOptional()
  title: string;

  @IsOptional()
  content: string;

  @IsOptional()
  assignTo: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
