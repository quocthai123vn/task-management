import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class SetPasswordDto {
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
    description: 'password',
    example: 'alo123',
  })
  @IsNotEmpty()
  @Length(6)
  password: string;

  @ApiProperty({
    type: String,
    description: 'OTP',
    example: '123456',
  })
  @IsNotEmpty()
  @Length(6, 6)
  @IsNumberString()
  otp: string;
}
