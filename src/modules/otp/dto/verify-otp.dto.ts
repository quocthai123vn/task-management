import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, Length } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    type: String,
    name: 'contact',
    description: 'email',
    default: 'nguyenvana@gmail.com',
  })
  @IsNotEmpty()
  contact: string;

  @ApiProperty({
    type: String,
    name: 'otp',
    description: 'OTP',
    default: '123456',
  })
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;
}
