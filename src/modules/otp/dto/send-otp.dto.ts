import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class SendOtpDto {
  @ApiProperty({
    type: String,
    name: 'contact',
    description: 'Email',
    default: 'nguyenvana@gmail.com',
  })
  @IsNotEmpty()
  contact: string;

}
