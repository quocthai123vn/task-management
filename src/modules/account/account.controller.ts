import {
  Body,
  Controller,
  HttpStatus,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommonErrorResponses } from 'src/shares/decorators/common-error-response.decorator';
import { InitAdminDto } from './dto/init-admin.dto';
import { VerifyAdminDto } from './dto/verify-admin.dto';
import { AuthGuard } from './account.guard';
import { SignInDto } from './dto/sign-in.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({
    operationId: 'createAdminAccount',
    description: 'Create admin account',
  })
  @ApiResponse({
    type: InitAdminDto,
    status: HttpStatus.OK,
    description: 'Create account successfully',
  })
  @CommonErrorResponses()
  @Post('admin/init')
  initAdminAccount(@Body() initAdminDto: InitAdminDto) {
    return this.accountService.initAdminAccount(initAdminDto);
  }

  @ApiOperation({
    operationId: 'verifyAdminAccount',
    description: 'Verify admin account',
  })
  @ApiResponse({
    type: VerifyAdminDto,
    status: HttpStatus.OK,
    description: 'Verify admin account successfully',
  })
  @CommonErrorResponses()
  @Post('admin/verify')
  verifyAdminAccount(@Body() verifyAdminDto: VerifyAdminDto) {
    return this.accountService.verifyAdminAccount(verifyAdminDto);
  }

  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['admin'])
  @ApiOperation({
    operationId: 'createAccount',
    description: 'Create account',
  })
  @ApiResponse({
    type: CreateAccountDto,
    status: HttpStatus.OK,
    description: 'Create account successfully',
  })
  @CommonErrorResponses()
  @Post('create')
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountService.createAccount(createAccountDto);
  }

  @ApiOperation({
    operationId: 'signIn',
    description: 'SignIn',
  })
  @ApiResponse({
    type: SignInDto,
    status: HttpStatus.OK,
    description: 'SignIn successfully',
  })
  @CommonErrorResponses()
  @Post('signIn')
  async signIn(signInDto: SignInDto) {
    return await this.accountService.signIn(signInDto);
  }

  @ApiOperation({
    operationId: 'forgotPassword',
    description: 'Forgot Password',
  })
  @ApiResponse({
    type: InitAdminDto,
    status: HttpStatus.OK,
    description: 'Forgot Password successfully',
  })
  @CommonErrorResponses()
  @Post('password/forgot')
  async forgotPassword(forgotPasswordDto: InitAdminDto) {
    return await this.accountService.forgotPassword(forgotPasswordDto);
  }

  @ApiOperation({
    operationId: 'resetPassword',
    description: 'Reset password',
  })
  @ApiResponse({
    type: ResetPasswordDto,
    status: HttpStatus.OK,
    description: 'Reset password successfully',
  })
  @CommonErrorResponses()
  @Post('password/reset')
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return await this.accountService.resetPassword(resetPasswordDto);
  }
}
