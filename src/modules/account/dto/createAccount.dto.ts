import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export enum AccountRoleEnum {
  admin = 'admin',
  user = 'user',
}

export class CreateAccountDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(AccountRoleEnum)
  role: string;
}
