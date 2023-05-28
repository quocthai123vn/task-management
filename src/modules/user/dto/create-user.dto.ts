import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Position } from 'src/shares/constants/enum.constant';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(Position)
  position: Position;

  @IsNotEmpty()
  accountId: string;

  @IsOptional()
  avatar?: string;
}
