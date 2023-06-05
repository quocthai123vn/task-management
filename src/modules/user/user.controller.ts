import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../account/account.guard';
import { CommonErrorResponses } from 'src/shares/decorators/common-error-response.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @ApiOperation({
    operationId: 'updateUser',
    description: 'Update user',
  })
  @ApiResponse({
    type: UpdateUserDto,
    status: HttpStatus.OK,
    description: 'Update user successfully',
  })
  @CommonErrorResponses()
  @Put('update')
  async createAccount(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    return await this.userService.updateUser(user.userId, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    operationId: 'getProfile',
    description: 'Get profile',
  })
  @ApiResponse({
    type: String,
    status: HttpStatus.OK,
    description: 'Get profile successfully',
  })
  @CommonErrorResponses()
  @Get('profile')
  async getProfile(@Req() req: any) {
    const user = req.user;
    return await this.userService.findUserByAccountId(user.userId);
  }
}
