import { IsEnum, IsOptional } from 'class-validator';
import { Position } from 'src/shares/constants/enum.constant';

export class UpdateUserDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsEnum(Position)
  position: Position;

  @IsOptional()
  avatar?: string;
}
