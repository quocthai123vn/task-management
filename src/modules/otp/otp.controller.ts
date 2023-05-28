import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { OtpService } from './otp.service';
import { CommonErrorResponses } from 'src/shares/decorators/common-error-response.decorator';

@ApiTags('OTP')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @ApiOperation({
    operationId: 'sendOtp',
    description: 'Send OTP to mail or phone number',
  })
  @ApiResponse({
    type: SendOtpDto,
    status: HttpStatus.OK,
    description: 'Send OTP successfully',
  })
  @CommonErrorResponses()
  @Post('/send')
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    await this.otpService.sendOtp(sendOtpDto);
  }

  @ApiOperation({
    operationId: 'verifyOtp',
    description: 'Verify OTP successfully',
  })
  @CommonErrorResponses()
  @Post('/verify')
  async verifyOTP(@Body() verifyOtpDto: VerifyOtpDto) {
    await this.otpService.verifyOtp(verifyOtpDto);
  }
}
