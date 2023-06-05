import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/shares/constants/enum.constant';

export class QueryTaskDto {
  @IsOptional()
  title: string;

  @IsOptional()
  content: string;

  @IsOptional()
  priority: number;

  @IsOptional()
  assignTo: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
