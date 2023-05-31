import { IsNotEmpty } from 'class-validator';

export class ActiveAccountDto {
  @IsNotEmpty()
  accountId: string;

  @IsNotEmpty()
  isActive: boolean;
}
