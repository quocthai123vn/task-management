import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { AccountRoleEnum } from 'src/shares/constants/enum.constant';

export class CreateAccountDto {
  @ApiProperty({
    type: String,
    description: 'Email',
    example: 'abc@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Role: admin or user',
    example: 'admin',
  })
  @IsNotEmpty()
  @IsEnum(AccountRoleEnum)
  role: AccountRoleEnum;
}
