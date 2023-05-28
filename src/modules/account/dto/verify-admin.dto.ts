import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class VerifyAdminDto {
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
